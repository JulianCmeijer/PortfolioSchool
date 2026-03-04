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

    // Simple poster carousel on project detail pagina's
    var carousels = Array.prototype.slice.call(
        document.querySelectorAll('[data-carousel]')
    );

    carousels.forEach(function (carousel) {
        var track = carousel.querySelector('[data-carousel-track]');
        var slides = Array.prototype.slice.call(
            carousel.querySelectorAll('[data-carousel-slide]')
        );
        var prevBtn = carousel.querySelector('[data-carousel-prev]');
        var nextBtn = carousel.querySelector('[data-carousel-next]');
        var captionEl = carousel.parentElement.querySelector('[data-carousel-caption]');
        var currentIndex = 0;

        function updateCarousel() {
            slides.forEach(function (slide, index) {
                slide.classList.toggle('is-active', index === currentIndex);
            });
            if (track) {
                track.style.transform = 'translateX(' + (currentIndex * -100) + '%)';
            }
            if (captionEl && slides[currentIndex]) {
                var activeSlide = slides[currentIndex];
                var captionText = activeSlide.getAttribute('data-caption') || '';
                captionEl.textContent = captionText;
            }
        }

        function goTo(offset) {
            if (!slides.length) return;
            currentIndex = (currentIndex + offset + slides.length) % slides.length;
            updateCarousel();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () { goTo(-1); });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () { goTo(1); });
        }

        updateCarousel();
    });
})();
