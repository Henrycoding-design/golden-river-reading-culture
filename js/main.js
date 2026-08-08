/* ============================================
   TẠP CHÍ ĐỌC (2025-2026) - Golden River
   Global JavaScript: Navigation, Theme Toggle, Mobile Menu
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== THEME TOGGLE ==========
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);

  function updateThemeIcons(theme) {
    document.querySelectorAll('.theme-icon').forEach(icon => {
      icon.textContent = theme === 'light' ? '🌙' : '☀️';
    });
  }

  updateThemeIcons(savedTheme);
  
  // Theme toggle click handler
  themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', function() {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
      
    //   // Add rotation animation
    //   const themeIcon = this.querySelector('.theme-icon') || this;
    //   themeIcon.style.transform = 'rotate(180deg)';
    //   setTimeout(() => {
    //     themeIcon.style.transform = 'rotate(0deg)';
    //   }, 300);
    });
  });
  
  // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Check if current path matches the link href
    if (currentPath.includes(href) || 
        (currentPath.endsWith('/') && href === 'index.html') ||
        (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
    
    // Special case for index.html
    if (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '')) {
      link.classList.add('active');
    }
  });
  
  // ========== MOBILE MENU TOGGLE ==========
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  
  if (mobileMenuToggle && mobileDrawer) {
    // Open mobile menu
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
      
      if (mobileOverlay) {
        mobileOverlay.classList.toggle('active');
      }
      
      // Prevent body scroll when menu is open
      body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking overlay
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
        this.classList.remove('active');
        body.style.overflow = '';
      });
    }
    
    // Close mobile menu when clicking a link
    const mobileNavLinks = mobileDrawer.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
        
        if (mobileOverlay) {
          mobileOverlay.classList.remove('active');
        }
        body.style.overflow = '';
      });
    });
  }
  
  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
  
  // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
  
  // ========== DYNAMIC YEAR UPDATE ==========
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }
  
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
