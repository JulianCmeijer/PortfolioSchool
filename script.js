(function () {
    // Footer year
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile nav toggle
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            navLinks.classList.toggle('is-open');
            toggle.setAttribute('aria-label',
                navLinks.classList.contains('is-open') ? 'Menu sluiten' : 'Menu openen');
        });
    }

    // Close mobile menu when clicking a link (anchor)
    var anchors = document.querySelectorAll('.nav-links a[href^="#"]');
    anchors.forEach(function (a) {
        a.addEventListener('click', function () {
            navLinks.classList.remove('is-open');
        });
    });
})();
