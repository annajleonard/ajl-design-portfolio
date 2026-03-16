// Fade transition for banner image
document.addEventListener('DOMContentLoaded', function() {
  const bannerImg = document.querySelector('.banner_img');
  if (bannerImg) {
    let showingFirst = true;
    const img1 = 'images/content/netflix/banner.png';
    const img2 = 'images/content/netflix/banner2.png';
    bannerImg.style.transition = 'opacity 3.5s';
    function swapBanner() {
      // Fade out smoothly
      bannerImg.style.opacity = 0.5;
      setTimeout(() => {
        bannerImg.src = showingFirst ? img2 : img1;
        showingFirst = !showingFirst;
        // Fade in smoothly
        bannerImg.style.opacity = 1;
      }, 2500);
    }
    setInterval(swapBanner, 7000);
  }
});
// Custom smooth scroll for side_navbar links and #sidehome (slower speed)
document.addEventListener('DOMContentLoaded', function() {
  function customSmoothScrollTo(target) {
    const scrollTo = target.getBoundingClientRect().top + window.pageYOffset;
    const startY = window.pageYOffset;
    const distance = scrollTo - startY;
    const duration = 2400; // milliseconds (slower)
    let startTime = null;

    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      // Ease function (easeInOutQuad)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
    requestAnimationFrame(animateScroll);
  }

  // Side navbar links
  const sideNavLinks = document.querySelectorAll('.side_navbar a');
  sideNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          customSmoothScrollTo(target);
        }
      }
    });
  });

  // Apply to .nav_return link (sidehome)
  const navReturn = document.querySelector('.nav_return');
  if (navReturn && navReturn.parentElement && navReturn.parentElement.tagName === 'A') {
    navReturn.parentElement.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          customSmoothScrollTo(target);
        }
      }
    });
  }
});
function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.getElementById("nav_menu");

  hamburger.classList.toggle("change");
  menu.classList.toggle("menu-visible");
  menu.classList.toggle("menu-hidden");
}