/**
 * Global application logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
        navbar.style.padding = '0.25rem 0';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '0';
      }
    });
  }

  // 2. Scroll to Top Button Logic
  const createScrollTopBtn = () => {
    const btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);

    // Show/Hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    // Scroll to top on click
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  createScrollTopBtn();

  // 3. Set Active Nav Link based on current URL
  const setActiveNavLink = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      // Basic matching
      const linkPath = link.getAttribute('href');
      
      // If we are at root or index.html and link is index.html
      if ((currentPath === '/' || currentPath.endsWith('index.html')) && linkPath === 'index.html') {
        link.classList.add('active');
      } 
      // If we are at create.html
      else if (currentPath.endsWith(linkPath) && linkPath !== 'index.html') {
        link.classList.add('active');
      }
    });
  };

  setActiveNavLink();
});
