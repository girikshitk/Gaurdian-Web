/* ============================================
   GAURDIAN — Portfolio Case Study
   JavaScript — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== NAVBAR SCROLL BEHAVIOR ==========
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('open');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('open');
    });
  });

  // ========== SCROLL REVEAL ANIMATIONS ==========
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========== PROGRESS BAR ANIMATION ==========
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFill.classList.add('animated');
        }
      });
    }, { threshold: 0.5 });

    progressObserver.observe(progressFill);
  }

  // ========== COUNTER ANIMATIONS ==========
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      element.textContent = current.toLocaleString() + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(el.dataset.target);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(el);
  });

  // ========== IMPACT VALUE ANIMATIONS ==========
  const impactItems = document.querySelectorAll('.impact-value');
  const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'popIn 0.6s var(--ease-out) forwards';
        impactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  impactItems.forEach(el => impactObserver.observe(el));

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });

  // ========== BADGE HOVER MICRO-INTERACTION ==========
  document.querySelectorAll('.badge-item:not(.locked)').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      const emoji = badge.querySelector('.badge-emoji');
      if (emoji) {
        emoji.style.transform = 'scale(1.25) rotate(8deg)';
        emoji.style.transition = 'transform 0.3s var(--ease-out)';
      }
    });
    badge.addEventListener('mouseleave', () => {
      const emoji = badge.querySelector('.badge-emoji');
      if (emoji) {
        emoji.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // ========== PARALLAX SUBTLE EFFECT ON HERO ==========
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.12}px)`;
          heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
      }
    });
  }

  // ========== LIGHTBOX (Click to View Fullscreen) ==========
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('section img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});
