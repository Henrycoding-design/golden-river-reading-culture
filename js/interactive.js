/* ============================================
   TẠP CHÍ ĐỌC (2025-2026) - Golden River
   Interactive JavaScript: Tabs, Modals, Carousel, etc.
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== TAB FUNCTIONALITY ==========
  const tabContainers = document.querySelectorAll('.tabs-container');
  
  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabContents = container.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        const targetContent = container.querySelector(`[data-content="${targetTab}"]`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });
  
  // ========== CREATIVE CORNER TABS ==========
  const creativeTabButtons = document.querySelectorAll('.creative-tab-btn');
  const creativeTabContents = document.querySelectorAll('.creative-tab-content');
  
  creativeTabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      creativeTabButtons.forEach(btn => btn.classList.remove('active'));
      creativeTabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const targetContent = document.querySelector(`[data-creative-content="${targetTab}"]`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
  
  // ========== LIGHTBOX FUNCTIONALITY ==========
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  
  // Open lightbox
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const caption = this.querySelector('.gallery-overlay h3');
      
      if (lightbox && lightboxContent && img) {
        lightboxContent.innerHTML = `
          <img src="${img.src}" alt="${img.alt}">
          ${lightboxClose ? '<button class="lightbox-close">&times;</button>' : ''}
          ${lightboxCaption && caption ? `<div class="lightbox-caption">${caption.textContent}</div>` : ''}
        `;
        lightbox.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Re-attach close event
        const newCloseBtn = lightboxContent.querySelector('.lightbox-close');
        if (newCloseBtn) {
          newCloseBtn.addEventListener('click', closeLightbox);
        }
      }
    });
  });
  
  // Close lightbox function
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      body.style.overflow = '';
    }
  }
  
  // Close lightbox on button click
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  // Close lightbox on background click
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Close lightbox on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
  
  // ========== MODAL FUNCTIONALITY ==========
  const modals = document.querySelectorAll('.modal');
  
  // Open modal
  document.querySelectorAll('.review-card').forEach(card => {
    card.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.querySelector(`#${modalId}`);
      
      if (modal) {
        modal.classList.add('active');
        body.style.overflow = 'hidden';
      }
    });
  });
  
  // Open video modal
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function() {
      const videoUrl = this.getAttribute('data-video-url');
      const videoTitle = this.querySelector('h3')?.textContent || 'Video Review';
      
      // Create or show video modal
      let videoModal = document.querySelector('.video-modal');
      
      if (!videoModal) {
        videoModal = document.createElement('div');
        videoModal.className = 'modal video-modal active';
        videoModal.innerHTML = `
          <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
              <h2>${videoTitle}</h2>
              <div class="video-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: var(--radius-lg);">
                <iframe 
                  src="${videoUrl}" 
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(videoModal);
        
        // Add close functionality
        const closeBtn = videoModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
          videoModal.classList.remove('active');
          body.style.overflow = '';
          // Stop video by clearing iframe
          const iframe = videoModal.querySelector('iframe');
          if (iframe) iframe.src = iframe.src;
        });
        
        // Close on background click
        videoModal.addEventListener('click', function(e) {
          if (e.target === videoModal) {
            videoModal.classList.remove('active');
            body.style.overflow = '';
            const iframe = videoModal.querySelector('iframe');
            if (iframe) iframe.src = iframe.src;
          }
        });
      } else {
        videoModal.classList.add('active');
        body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close all modals
  document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      modal.classList.remove('active');
      body.style.overflow = '';
    });
  });
  
  // Close modal on background click
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          modal.classList.remove('active');
          body.style.overflow = '';
        }
      });
    }
  });
  
  // ========== STORY READER FUNCTIONALITY ==========
  const storyCards = document.querySelectorAll('.story-card');
  const readerView = document.querySelector('.reader-view');
  const readerContent = document.querySelector('.reader-content');
  const backButton = document.querySelector('.back-to-stories');
  
  // Open story reader
  storyCards.forEach(card => {
    card.addEventListener('click', function() {
      const storyTitle = this.getAttribute('data-story-title');
      const storyContent = this.getAttribute('data-story-content');
      
      if (readerView && readerContent) {
        readerContent.innerHTML = `
          <h2>${storyTitle}</h2>
          <div class="story-text">${storyContent}</div>
        `;
        
        // Hide story selector, show reader
        const storySelector = document.querySelector('.story-selector');
        if (storySelector) {
          storySelector.style.display = 'none';
        }
        readerView.classList.add('active');
        
        // Scroll to reader
        readerView.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Back to stories
  if (backButton) {
    backButton.addEventListener('click', function() {
      if (readerView) {
        readerView.classList.remove('active');
      }
      
      const storySelector = document.querySelector('.story-selector');
      if (storySelector) {
        storySelector.style.display = 'grid';
      }
    });
  }
  
  // ========== FONT SIZE CONTROLS ==========
  const fontSizeControls = document.querySelectorAll('.font-size-control button');
  
  fontSizeControls.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      const readerText = document.querySelector('.reader-content');
      
      if (!readerText) return;
      
      const currentSize = parseFloat(window.getComputedStyle(readerText).fontSize);
      let newSize = currentSize;
      
      if (action === 'increase') {
        newSize = Math.min(currentSize + 2, 24);
      } else if (action === 'decrease') {
        newSize = Math.max(currentSize - 2, 14);
      } else if (action === 'reset') {
        newSize = 18; // Default size
      }
      
      readerText.style.fontSize = `${newSize}px`;
    });
  });
  
  // ========== THEME ADJUSTER FOR READER ==========
  const themeAdjuster = document.querySelector('.theme-adjuster');
  
  if (themeAdjuster) {
    const themeButtons = themeAdjuster.querySelectorAll('button');
    
    themeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const theme = this.getAttribute('data-reader-theme');
        const readerView = document.querySelector('.reader-view');
        
        if (!readerView) return;
        
        // Remove all theme classes
        readerView.classList.remove('theme-sepia', 'theme-dark', 'theme-light');
        
        // Add selected theme
        if (theme) {
          readerView.classList.add(`theme-${theme}`);
        }
      });
    });
  }
  
  // ========== COMIC CAROUSEL ==========
  const comicCarousel = document.querySelector('.comic-carousel');
  
  if (comicCarousel) {
    const slides = comicCarousel.querySelectorAll('.comic-slide');
    const prevBtn = comicCarousel.querySelector('.comic-prev');
    const nextBtn = comicCarousel.querySelector('.comic-next');
    const thumbnails = comicCarousel.querySelectorAll('.comic-thumbnail');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
      // Wrap around
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      
      currentSlide = index;
      
      // Update slides
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });
      
      // Update thumbnails
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentSlide);
      });
      
      // Scroll thumbnail into view
      if (thumbnails[currentSlide]) {
        thumbnails[currentSlide].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
    
    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
      });
    }
    
    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
      });
    }
    
    // Thumbnail clicks
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!comicCarousel.classList.contains('active')) return;
      
      if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
      }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    comicCarousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    comicCarousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          showSlide(currentSlide + 1); // Swipe left, go next
        } else {
          showSlide(currentSlide - 1); // Swipe right, go prev
        }
      }
    }
    
    // Initialize first slide
    showSlide(0);
  }
  
  // ========== COMMENT FORM HANDLING ==========
  const commentForm = document.querySelector('.comment-form');
  
  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = this.querySelector('input[name="name"]');
      const messageInput = this.querySelector('textarea[name="message"]');
      
      if (nameInput && messageInput) {
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        
        if (name && message) {
          // Here you would typically send the data to a server
          // For now, we'll just show a success message
          alert(`Cảm ơn ${name} đã để lại lời nhắn! (Demo only - no backend connected)`);
          
          // Clear form
          nameInput.value = '';
          messageInput.value = '';
        } else {
          alert('Vui lòng điền đầy đủ thông tin!');
        }
      }
    });
  }
  
  // ========== SMOOTH REVEAL ON SCROLL ==========
  const revealElements = document.querySelectorAll('.card, .gallery-item, .review-card, .video-card, .story-card, .poem-card, .team-member');
  
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
  
  // ========== LAZY LOADING IMAGES ==========
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
  
});

// ========== UTILITY FUNCTIONS ==========

// Format date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('vi-VN', options);
}

// Truncate text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}