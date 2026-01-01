// Smooth scrolling with safety checks
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    // Ignore empty or invalid hashes
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Active navigation on scroll (optimized)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

let lastActive = null;

const setActiveLink = () => {
  let currentSection = null;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.id;
    }
  });

  if (currentSection && currentSection !== lastActive) {
    lastActive = currentSection;

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentSection}`
      );
    });
  }
};

// Throttle scroll for better performance
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      setActiveLink();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial highlight on page load
window.addEventListener('load', setActiveLink);

console.log('Mani Iyer Blogs loaded successfully');
