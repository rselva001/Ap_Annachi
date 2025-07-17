// Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const body = document.body;

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
            // Change icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });

        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Gallery card pop effect
        document.querySelectorAll('.gallery-card img').forEach(img => {
            img.addEventListener('touchstart', function () {
                img.classList.remove('pop');
                void img.offsetWidth;
                img.classList.add('pop');
            });
            img.addEventListener('animationend', function () {
                img.classList.remove('pop');
            });
        });

        // Gallery card fade-in animation
        document.addEventListener('DOMContentLoaded', function () {
            const cards = document.querySelectorAll('.gallery-card');
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15 }
            );
            cards.forEach(card => observer.observe(card));
        });

        // Bottom navbar hide on scroll down, show on scroll up
        let lastScrollY = window.scrollY;
        const bottomNavbar = document.querySelector('.bottom-navbar');
        if (bottomNavbar) {
            bottomNavbar.style.transition = 'transform 0.3s';
            window.addEventListener('scroll', function () {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    // Scrolling down
                    bottomNavbar.style.transform = 'translateY(100%)';
                } else {
                    // Scrolling up
                    bottomNavbar.style.transform = 'translateY(0)';
                }
                lastScrollY = window.scrollY;
            });
        }

        document.addEventListener('DOMContentLoaded', function () {
          const slides = document.querySelectorAll('.gallery-slide');
          const dotsContainer = document.querySelector('.gallery-dots');
          const nextBtn = document.querySelector('.gallery-next-btn');
          let current = 0;

          // Create dots for manual navigation
          slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
          });

          function showSlide(idx) {
            slides.forEach((slide, i) => {
              slide.classList.toggle('active', i === idx);
            });
            document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
              dot.classList.toggle('active', i === idx);
            });
          }

          function goToSlide(idx) {
            current = idx;
            showSlide(current);
          }

          // Next button functionality
          if (nextBtn) {
            nextBtn.addEventListener('click', function () {
              goToSlide((current + 1) % slides.length);
            });
          }

          // Optional: swipe left/right for manual navigation
          let startX = null;
          slides.forEach(slide => {
            slide.addEventListener('touchstart', function (e) {
              startX = e.touches[0].clientX;
            });
            slide.addEventListener('touchend', function (e) {
              if (startX === null) return;
              let endX = e.changedTouches[0].clientX;
              if (endX - startX > 40) { // swipe right
                goToSlide((current - 1 + slides.length) % slides.length);
              } else if (startX - endX > 40) { // swipe left
                goToSlide((current + 1) % slides.length);
              }
              startX = null;
            });
          });

          showSlide(current);
        });