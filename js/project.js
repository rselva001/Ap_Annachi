    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const body = document.body;

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuOverlay.classList.toggle('active');
      body.classList.toggle('menu-open');
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