
// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // Add animation for hamburger if desired
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Cookie Consent & Google Analytics Logic
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    const privacyLink = document.getElementById('open-privacy');

    // Check localStorage
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
        // Show banner if no choice made
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 2000); // Delay for better UX
    } else if (consent === 'granted') {
        loadAnalytics();
    }

    // Accept Action
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'granted');
        cookieBanner.style.display = 'none';
        loadAnalytics();
    });

    // Decline Action
    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'denied');
        cookieBanner.style.display = 'none';
    });
});

function loadAnalytics() {
    // Grant consent in GTM dataLayer
    if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
        });
    }

    // Check if Clarity is already loaded
    if (window.clarity) return;

    // Load Microsoft Clarity dynamically
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "wmht9ohmpv");

    console.log('Analytics and Clarity loaded (Consent Granted)');
}
