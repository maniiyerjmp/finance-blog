/* ================================
   Smooth Scrolling (Accessible)
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (!targetEl) return;

    e.preventDefault();
    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

/* ================================
   Scroll Reveal Animations
================================ */
const revealElements = document.querySelectorAll(
  '.basic-card, .strategy-card, .resource-card, .tip-card'
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target); // Animate once
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  }
);

revealElements.forEach(el => {
  el.classList.add('reveal-hidden');
  revealObserver.observe(el);
});

/* ================================
   Active Navigation Highlight
   (Throttled for performance)
================================ */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveNav();
      ticking = false;
    });
    ticking = true;
  }
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 220;

  let currentSectionId = '';

  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentSectionId}`
    );
  });
}

/* ================================
   Flowchart Hover Polish
================================ */
document.querySelectorAll('.flow-step, .decision-box').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.05)';
    el.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
    el.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
    el.style.boxShadow = 'none';
  });
});

/* ================================
   Console Branding (Production Safe)
================================ */
if (window.location.hostname === 'localhost' || window.location.hostname.includes('github')) {
  console.log('%cFinance Hub Loaded Successfully', 'color:#0d6efd;font-weight:bold;');
  console.log('%cBuild wealth with discipline & knowledge.', 'color:#28a745;');
}
