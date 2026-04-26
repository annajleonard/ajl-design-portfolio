// Fade transition for banner image
// Opt in per page by adding data-banner-images on the .banner_img element:
//   <img class="banner_img" src="first.webp" data-banner-images='["first.webp","second.webp"]'>
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

// Fade swap for any image that opts in with data-fade-images.
// Example:
// <img src="first.webp" data-fade-images='["first.webp","second.webp"]'>
document.addEventListener('DOMContentLoaded', function() {
  const fadeTargets = document.querySelectorAll('img[data-fade-images]');
  if (!fadeTargets.length) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  fadeTargets.forEach(function(img) {
    let images;
    try {
      images = JSON.parse(img.dataset.fadeImages || '[]');
    } catch (e) {
      console.warn('image fade: data-fade-images must be a valid JSON array.', e);
      return;
    }

    if (!Array.isArray(images) || images.length < 2) return;

    images.forEach(function(src) {
      const preload = new Image();
      preload.src = src;
    });

    const fadeDuration = Number(img.dataset.fadeDuration) || 1000;
    const interval = Number(img.dataset.fadeInterval) || 4500;
    let currentIndex = Math.max(images.indexOf(img.getAttribute('src') || ''), 0);

    img.style.transition = 'opacity ' + fadeDuration + 'ms ease-in-out';
    img.style.opacity = '1';

    setInterval(function() {
      img.style.opacity = '0';
      setTimeout(function() {
        currentIndex = (currentIndex + 1) % images.length;
        img.src = images[currentIndex];
        img.style.opacity = '1';
      }, fadeDuration);
    }, interval);
  });
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