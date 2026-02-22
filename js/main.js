
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

    // Privacy Policy Mock - REMOVED to allow simple navigation
    // privacyLink.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     alert("Tu będzie treść Polityki Prywatności zgodnie z RODO (wyskakujące okno).");
    // });
});

function loadAnalytics() {
    // Check if scripts are already loaded
    if (document.querySelector('script[src*="googletagmanager"]') || window.clarity) return;

    // Grant consent in GTM dataLayer
    window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
    });

    // Load the GTM Script dynamically
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-TD8GXRNM5G';
    document.head.appendChild(gaScript);

    gaScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-TD8GXRNM5G');
    };

    // Load Microsoft Clarity dynamically
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "vlftt1v8vo");

    console.log('Analytics and Clarity loaded (Consent Granted)');
}
