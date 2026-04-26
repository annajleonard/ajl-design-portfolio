// Filter works based on category selection
function filterWorks(category) {
    const worksItems = Array.from(document.querySelectorAll('.works'));
    if (worksItems.length === 0) {
        return;
    }
    const navLinks = document.querySelectorAll('.main_navbar a, #nav_menu a');

    // Update active class on nav links
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        if (category && text === category) {
            link.classList.add('active');
        } else if (text === 'UX/UI DESIGN' || text === 'GRAPHIC DESIGN') {
            link.classList.remove('active');
        }
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        setWorkVisibilityImmediate(worksItems, category);
        return;
    }

    setWorkVisibilityStaggered(worksItems, category);
}

let filterAnimationToken = 0;
const FILTER_LEAVE_MS = 180;
const FILTER_STAGGER_MS = 85;
const FILTER_ENTER_PRIME_MS = 40;

function getWorkGroups(workElement) {
    const groups = workElement.getAttribute('data-groups');
    if (!groups) {
        return [];
    }

    try {
        return JSON.parse(groups);
    } catch (e) {
        console.error('Error parsing data-groups:', e);
        return [];
    }
}

function shouldShowWork(workElement, category) {
    if (!category) {
        return true;
    }

    const groups = getWorkGroups(workElement);
    return groups.includes(category);
}

function setWorkVisibilityImmediate(workItems, category) {
    workItems.forEach(work => {
        const show = shouldShowWork(work, category);
        work.classList.remove('works-leaving', 'works-entering', 'works-hidden');
        if (!show) {
            work.classList.add('works-hidden');
        }
    });
}

function setWorkVisibilityStaggered(workItems, category) {
    const animationId = ++filterAnimationToken;
    const visibleItems = workItems.filter(work => !work.classList.contains('works-hidden'));

    // Phase 1: fade out current visible set.
    visibleItems.forEach(work => {
        work.classList.remove('works-entering');
        work.classList.add('works-leaving');
    });

    const leaveDelay = visibleItems.length > 0 ? FILTER_LEAVE_MS : 0;

    setTimeout(() => {
        if (animationId !== filterAnimationToken) {
            return;
        }

        const toShow = workItems.filter(work => shouldShowWork(work, category));

        // Phase 2a: hide non-matching cards only after fade-out completes.
        workItems.forEach(work => {
            if (!toShow.includes(work)) {
                work.classList.remove('works-entering', 'works-leaving');
                work.classList.add('works-hidden');
            }
        });

        // Phase 2b: reveal matching cards in a staggered cascade.
        toShow.forEach((work, index) => {
            work.classList.remove('works-hidden', 'works-leaving');
            work.classList.add('works-entering');

            const enterDelay = FILTER_ENTER_PRIME_MS + (index * FILTER_STAGGER_MS);
            setTimeout(() => {
                if (animationId !== filterAnimationToken) {
                    return;
                }

                requestAnimationFrame(() => {
                    if (animationId !== filterAnimationToken) {
                        return;
                    }
                    work.classList.remove('works-entering');
                });
            }, enterDelay);
        });
    }, leaveDelay);
}

// Initialize filter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.main_navbar a, #nav_menu a');
    const logoLink = document.querySelector('.logo_container a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            const href = this.getAttribute('href');

            // Only filter for UX/UI DESIGN and GRAPHIC DESIGN
            if ((text === 'UX/UI DESIGN' || text === 'GRAPHIC DESIGN') && href.endsWith('index.html')) {
                e.preventDefault();
                // Navigate to index.html and pass the category as a query parameter
                const basePath = href.includes('../../') ? '../../' : './';
                window.location.href = basePath + 'index.html?filter=' + encodeURIComponent(text);
            }
        });
    });

    // Clear filters when logo/HOME is clicked
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.endsWith('index.html')) {
                e.preventDefault();
                window.location.href = href;
            }
        });
    }

    // Apply URL filter as soon as DOM is ready to avoid image-flash on full page load.
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    const hasWorksGrid = document.querySelector('.works_container .works');
    if (hasWorksGrid) {
        filterWorks(filter || null);
    }
});
