// Filter works based on category selection
function filterWorks(category) {
    const worksItems = document.querySelectorAll('.works');
    const navLinks = document.querySelectorAll('.main_navbar a, #nav_menu a');
    
    // Update active class on nav links
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        if (category && (text === category)) {
            link.classList.add('active');
        } else if (text === 'UX/UI DESIGN' || text === 'GRAPHIC DESIGN') {
            link.classList.remove('active');
        }
    });
    
    if (!category) {
        // Show all works if no category is selected
        worksItems.forEach(work => {
            work.style.display = 'flex';
        });
        return;
    }
    
    worksItems.forEach(work => {
        const groups = work.getAttribute('data-groups');
        if (groups) {
            try {
                const groupsArray = JSON.parse(groups);
                if (groupsArray.includes(category)) {
                    work.style.display = 'flex';
                } else {
                    work.style.display = 'none';
                }
            } catch (e) {
                console.error('Error parsing data-groups:', e);
            }
        }
    });
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
            if ((text === 'UX/UI DESIGN' || text === 'GRAPHIC DESIGN') && href === './index.html') {
                e.preventDefault();
                // Navigate to index.html and pass the category as a query parameter
                window.location.href = './index.html?filter=' + encodeURIComponent(text);
            }
        });
    });
    
    // Clear filters when logo/HOME is clicked
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === './index.html') {
                e.preventDefault();
                window.location.href = './index.html';
            }
        });
    }
});

// When page loads, check for filter parameter and apply it
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    if (filter) {
        filterWorks(filter);
    }
});
