document.addEventListener('DOMContentLoaded', () => {

    // ============================================= //
    // MOBILE NAVIGATION TOGGLE
    // ============================================= //
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // ============================================= //
    // ANIMATED COUNTERS ON SCROLL
    // ============================================= //
    const counters = document.querySelectorAll('.counter');
    const impactSection = document.getElementById('impact');

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 200; // Speed of the counter

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    };

    const observerOptions = {
        root: null, // viewport
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the impact section is intersecting and hasn't been animated yet
            if (entry.isIntersecting && !impactSection.classList.contains('animated')) {
                counters.forEach(startCounter);
                impactSection.classList.add('animated'); // Mark as animated
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Start observing the impact section
    if (impactSection) {
        counterObserver.observe(impactSection);
    }

    // ============================================= //
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ============================================= //
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('#main-header nav .nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // The 71 is to account for the header height + 1px
            if (pageYOffset >= (sectionTop - 71)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

});
