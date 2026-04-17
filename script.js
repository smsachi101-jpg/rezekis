document.addEventListener('DOMContentLoaded', () => {
  
  // ========== VIDEO SLIDER ==========
  const videoSlider = document.querySelector('.video-slider');
  const videos = document.querySelectorAll('.hero-video');
  const dots = document.querySelectorAll('.video-dot');
  const prevBtn = document.getElementById('videoPrev');
  const nextBtn = document.getElementById('videoNext');
  
  if (videoSlider && videos.length > 0) {
    let currentIndex = 0;
    let autoPlayInterval;
    const slideDuration = 6000;
    
    const showVideo = (index) => {
      videos.forEach((video, i) => {
        video.classList.remove('active');
        dots[i].classList.remove('active');
      });
      videos[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
      
      videos.forEach(video => video.pause());
      videos[index].play().catch(() => {});
    };
    
    const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % videos.length;
      showVideo(nextIndex);
    };
    
    const prevSlide = () => {
      const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
      showVideo(prevIndex);
    };
    
    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, slideDuration);
    };
    
    const stopAutoPlay = () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    };
    
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => { showVideo(index); startAutoPlay(); });
    });
    
    videos[currentIndex].play().catch(() => {});
    startAutoPlay();
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoPlay();
      else startAutoPlay();
    });
  }
  
  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ========== MOBILE MENU TOGGLE ==========
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // ========== PARALLAX VIDEO EFFECT ==========
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset;
      heroVideo.style.transform = `translateY(${scroll * 0.3}px)`;
    }, { passive: true });
  }

  // ========== COUNTER ANIMATION ==========
  const counters = document.querySelectorAll('.metric-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  };

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        if (counter.hasAttribute('data-count')) {
          animateCounter(counter);
        }
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    if (counter.hasAttribute('data-count')) {
      counterObserver.observe(counter);
    }
  });

  // ========== SCROLL ANIMATIONS ==========
  const animatedElements = document.querySelectorAll(
    '.flow-step, .service-card, .tech-card, .leader-card, .credential-item, .integration-item, .client-card'
  );

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    animationObserver.observe(el);
  });

  // ========== SECTION ANIMATIONS ==========
  const sections = document.querySelectorAll('.section-header, .about-content, .about-visual');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    section.classList.add('animate-ready');
    sectionObserver.observe(section);
  });

  // ========== CARD TILT EFFECT ==========
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== NAV LINK ACTIVE STATE ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== CONTACT FORM HANDLING ==========
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      console.log('Form submitted:', data);
      
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.classList.add('show');
      }
    });
  }

  // ========== FORM RESET ==========
  window.resetForm = function() {
    if (contactForm) {
      contactForm.reset();
      contactForm.style.display = 'block';
      if (formSuccess) {
        formSuccess.classList.remove('show');
      }
    }
  };

  // ========== SCAN LINE ANIMATION ==========
  const scanLines = document.querySelectorAll('.scan-line');
  scanLines.forEach(line => {
    line.style.animationDuration = '8s';
  });

  // ========== TYPEWRITER EFFECT (Optional for Hero) ==========
  const typewriterElement = document.querySelector('.typewriter');
  
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '2px solid var(--primary)';
    
    let charIndex = 0;
    
    const typeWriter = () => {
      if (charIndex < text.length) {
        typewriterElement.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          typewriterElement.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  // ========== PRELOADER (Optional) ==========
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
      }
    }, 500);
  });

  // ========== RIPPLE EFFECT FOR BUTTONS ==========
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ========== SKILL BARS ANIMATION (For Leadership Page) ==========
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage + '%';
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  // ========== SCROLL PROGRESS BAR ==========
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00D1FF, #00ffa6);
    z-index: 9999;
    transition: width 0.1s;
  `;
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  }, { passive: true });

  // ========== GLOW EFFECTS ON HOVER ==========
  document.querySelectorAll('.glow-on-hover').forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.boxShadow = '0 0 30px rgba(0, 209, 255, 0.5)';
    });
    element.addEventListener('mouseleave', () => {
      element.style.boxShadow = 'none';
    });
  });

  // ========== CURSOR TRAILER (Desktop Only) ==========
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 1px solid rgba(0, 209, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.15s ease, opacity 0.15s ease;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    let cursorVisible = false;

    document.addEventListener('mousemove', (e) => {
      cursorVisible = true;
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseout', () => {
      cursorVisible = false;
      cursor.style.opacity = '0';
    });
  }

});

// ========== CSS FOR RIPPLE ANIMATION ==========
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .animate-ready {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .animate-ready.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
