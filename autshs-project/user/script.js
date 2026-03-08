document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const sidebar = document.querySelector('.sidebar');
    const darkModeToggle = document.querySelector('#darkModeToggle');
    const body = document.body;

    // Mobile menu toggle
    burger.addEventListener('click', () => {
        sidebar.classList.toggle('nav-active');
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        // Disable button during transition
        darkModeToggle.disabled = true;
        darkModeToggle.classList.toggle('active');
        
        // Delay the actual dark mode application for smooth transition
        setTimeout(() => {
            body.classList.toggle('dark-mode');
            
            // Save dark mode preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
            
            // Re-enable button after transition
            darkModeToggle.disabled = false;
        }, 250);
    });

    // Check for saved dark mode preference on page load
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }

    // Apply edited content from admin panel
    applyAdminEdits();
});

// Function to apply content edits from admin panel
function applyAdminEdits() {
    // Home page content
    const homeTitle = localStorage.getItem('userContent_homeTitle');
    const homeDesc = localStorage.getItem('userContent_homeDesc');
    
    if (homeTitle) {
        const pageTitleEl = document.querySelector('.page-header h1');
        if (pageTitleEl) pageTitleEl.textContent = homeTitle;
    }
    
    if (homeDesc) {
        const pageDescEl = document.querySelector('.page-header p');
        if (pageDescEl) pageDescEl.textContent = homeDesc;
    }

    // School information
    const schoolName = localStorage.getItem('userContent_schoolName');
    const schoolEmail = localStorage.getItem('userContent_schoolEmail');
    const schoolPhone = localStorage.getItem('userContent_schoolPhone');
    const schoolAddress = localStorage.getItem('userContent_schoolAddress');
    const academicYear = localStorage.getItem('userContent_academicYear');

    if (schoolName) {
        const schoolNameEls = document.querySelectorAll('.sidebar h2, .school-info p');
        schoolNameEls.forEach(el => {
            if (el.querySelector && !el.querySelector('i')) {
                el.textContent = schoolName;
            }
        });
    }

    if (schoolEmail) {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${schoolEmail}`;
            link.textContent = schoolEmail;
        });
    }

    if (schoolPhone) {
        const phoneEls = document.querySelectorAll('.contact-details .phone, .footer-section p');
        phoneEls.forEach(el => {
            if (el.textContent.includes('(02)') || el.textContent.includes('+63')) {
                el.textContent = schoolPhone;
            }
        });
    }

    if (schoolAddress) {
        const addressEls = document.querySelectorAll('.contact-details .address, .footer-section p');
        addressEls.forEach(el => {
            if (el.textContent.includes('St.') || el.textContent.includes('City')) {
                el.textContent = schoolAddress;
            }
        });
    }

    if (academicYear) {
        const yearEl = document.querySelector('.user-profile span');
        if (yearEl && yearEl.textContent.includes('SY')) {
            yearEl.textContent = academicYear;
        }
    }

    // Card content
    const cards = document.querySelectorAll('.card');
    const cardFields = [
        { title: 'card1Title', desc: 'card1Desc' },
        { title: 'card2Title', desc: 'card2Desc' },
        { title: 'card3Title', desc: 'card3Desc' },
        { title: 'card4Title', desc: 'card4Desc' }
    ];

    cards.forEach((card, index) => {
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('p');

        const newTitle = localStorage.getItem(`userContent_${cardFields[index].title}`);
        const newDesc = localStorage.getItem(`userContent_${cardFields[index].desc}`);

        if (newTitle && titleEl) titleEl.textContent = newTitle;
        if (newDesc && descEl) descEl.textContent = newDesc;
    });

    // Social links
    const fbUrl = localStorage.getItem('userContent_facebookUrl');
    if (fbUrl) {
        const fbLink = document.querySelector('a[href*="facebook"]');
        if (fbLink) fbLink.href = fbUrl;
    }

    const footerEmail = localStorage.getItem('userContent_footerEmail');
    if (footerEmail) {
        const footerEmailLink = document.querySelector('.footer-section a[href^="mailto:"]');
        if (footerEmailLink) {
            footerEmailLink.href = `mailto:${footerEmail}`;
            footerEmailLink.textContent = footerEmail;
        }
    }

    const footerPhone = localStorage.getItem('userContent_footerPhone');
    if (footerPhone) {
        const phoneElements = document.querySelectorAll('.footer-section p');
        phoneElements.forEach(el => {
            if (el.textContent.includes('+63') || el.textContent.includes('(02)')) {
                el.innerHTML = `<i class="fas fa-phone"></i> ${footerPhone}`;
            }
        });
    }

    const footerAddress = localStorage.getItem('userContent_footerAddress');
    if (footerAddress) {
        const addressElements = document.querySelectorAll('.footer-section p');
        addressElements.forEach(el => {
            if (el.textContent.includes('St.') || el.textContent.includes('City')) {
                el.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${footerAddress}`;
            }
        });
    }
}