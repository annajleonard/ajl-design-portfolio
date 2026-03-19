// Fade transition for banner image
// Opt in per page by adding data-banner-images on the .banner_img element:
//   <img class="banner_img" src="first.png" data-banner-images='["first.png","second.png"]'>
// Omit the attribute (or provide fewer than 2 images) to disable the transition.
document.addEventListener('DOMContentLoaded', function() {
  const bannerImg = document.querySelector('.banner_img');
  if (!bannerImg) return;

  const raw = bannerImg.dataset.bannerImages;
  if (!raw) return;

  let images;
  try {
    images = JSON.parse(raw);
  } catch (e) {
    console.warn('banner_img: data-banner-images must be a valid JSON array.', e);
    return;
  }

  if (!Array.isArray(images) || images.length < 2) return;

  let currentIndex = 0;
  bannerImg.style.transition = 'opacity 3.5s';

  function swapBanner() {
    bannerImg.style.opacity = 0.5;
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      bannerImg.src = images[currentIndex];
      bannerImg.style.opacity = 1;
    }, 2500);
  }

  setInterval(swapBanner, 7000);
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