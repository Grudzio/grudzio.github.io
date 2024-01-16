// main.js

document.addEventListener('DOMContentLoaded', function () {
    switchLanguage('en'); // Assuming you want English as the default language
});

function switchLanguage(lang) {
    document.getElementById('pl').style.display = lang === 'pl' ? 'block' : 'none';
    document.getElementById('en').style.display = lang === 'en' ? 'block' : 'none';
}
