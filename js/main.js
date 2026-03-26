// Navbar Toggle for Mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Smooth Scrolling for Navigation Links
const smoothScroll = () => {
    const links = document.querySelectorAll('nav a, .hero-btns a, .back-link');

    for (const link of links) {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only smooth scroll for internal anchors on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for navbar
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const nav = document.querySelector('.nav-links');
                    const burger = document.querySelector('.burger');
                    if (nav && nav.classList.contains('nav-active')) {
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                        document.querySelectorAll('.nav-links li').forEach(li => li.style.animation = '');
                    }
                }
            }
            // If it's a link to index.html with an anchor from another page
            else if (href.includes('index.html#')) {
                // Let the default behavior happen or handle it if we're already on index.html
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    e.preventDefault();
                    const targetId = href.split('#')[1];
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    }
};

// Contact Form Handling
const handleContactForm = () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation check (required attributes handle most of it)
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                status.innerHTML = '<p style="color: red; margin-top: 1rem;">Please fill in all fields.</p>';
                return;
            }

            // Simulate form submission
            status.innerHTML = '<p style="color: var(--secondary-color); margin-top: 1rem;">Sending message...</p>';
            
            setTimeout(() => {
                status.innerHTML = '<p style="color: green; margin-top: 1rem;">Thank you! Your message has been sent successfully.</p>';
                form.reset();
            }, 2000);
        });
    }
};

// Intersection Observer for Animations on Scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    smoothScroll();
    handleContactForm();

    // Observe elements for scroll animation
    const sections = document.querySelectorAll('.section, .project-item');
    sections.forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
});

// CSS for reveal animation (to be added to style.css if needed or kept here)
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }

    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .toggle .line2 {
        opacity: 0;
    }
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }

    .reveal.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
