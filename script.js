// Register GSAP ScrollTrigger (guarded in case CDN fails)
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.innerWidth > 768 && cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }, { passive: true });

    (function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateOutline);
    })();

    document.querySelectorAll('a, button, .project-card-portfolio').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// Header text reveal animation
if (typeof gsap !== 'undefined') {
    gsap.to('.reveal-text', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.2
    });

    // Project items staggered reveal
    gsap.utils.toArray('.project-item').forEach((item, i) => {
        gsap.to(item, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            },
            delay: (i % 2) * 0.12
        });
    });

    // Parallax effect on project images (skip if user prefers reduced motion)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.utils.toArray('.project-image-wrapper').forEach((wrapper) => {
            const img = wrapper.querySelector('.project-img');
            gsap.fromTo(img,
                { y: '-8%' },
                {
                    y: '8%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        });
    }
} else {
    // Fallback: show everything without animations
    document.querySelectorAll('.reveal-text, .project-item').forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'none';
    });
}

// Magnetic button effect
if (!window.matchMedia('(pointer: coarse)').matches) {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(item,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.5, delay: index * 0.05, ease: 'power2.out' }
                    );
                } else {
                    item.style.opacity = 1;
                    item.style.transform = 'none';
                }
            } else {
                if (typeof gsap !== 'undefined') {
                    gsap.to(item, {
                        opacity: 0,
                        y: -30,
                        duration: 0.3,
                        onComplete: () => item.classList.add('hidden')
                    });
                } else {
                    item.classList.add('hidden');
                }
            }
        });

        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('active');
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    if (!isOpen) {
        document.body.classList.add('menu-open');
        document.body.dataset.scrollY = window.scrollY.toString();
        document.body.style.top = '-' + window.scrollY + 'px';
    } else {
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        const scrollY = document.body.dataset.scrollY || '0';
        window.scrollTo(0, parseInt(scrollY));
    }
}

if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
if (closeMenu) closeMenu.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// Navigation background on scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.pageYOffset > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Refresh ScrollTrigger on load
window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});
