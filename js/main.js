/**
 * Moji Home — Main JavaScript
 * Focus: Smooth Parallax, Horizontal Platforms, and Simplified Flow
 */

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect GSAP with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// 2. GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Normalize scroll for mobile pinning stability
    ScrollTrigger.config({ normalizeScroll: true });

    const nav = document.querySelector("nav");
    let lastScrollY = window.scrollY;

    // Navigation state on scroll
    lenis.on('scroll', ({ scroll }) => {
        if (scroll > 50) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");

        if (scroll > lastScrollY && scroll > 200) nav.classList.add("nav-hidden");
        else nav.classList.remove("nav-hidden");
        lastScrollY = scroll;
    });


    // Floating Brush Strokes (Subtle)
    gsap.to(".brush-1", {
        y: -100,
        rotate: -20,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    // Text Reveal (Character based)
    const splitTypes = document.querySelectorAll(".reveal-type");
    splitTypes.forEach((char) => {
        const text = new SplitType(char, { types: 'chars,lines' });
        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: char,
                start: 'top 90%',
                end: 'top 40%',
                scrub: 0.5,
            },
            opacity: 0.1,
            stagger: 0.05,
            duration: 1
        });
    });

    // --- Horizontal Scroll (Mandarin & Nebula) ---
    // Works on both Mobile and Desktop
    const sections = gsap.utils.toArray(".horizontal-slide");
    const container = document.querySelector(".horizontal-container");
    
    const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            // Snap to slides for better feel
            snap: 1 / (sections.length - 1),
            start: "top top",
            end: () => "+=" + container.offsetWidth * 2,
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });

    // --- Nebula Logo Interactive Parallax ---
    gsap.to(".nebula-logo", {
        x: -40,
        rotate: 5,
        ease: "none",
        scrollTrigger: {
            trigger: ".bg-red",
            containerAnimation: scrollTween, // Assuming I name the horizontal tween
            start: "left right",
            end: "right left",
            scrub: true
        }
    });

    // Re-refresh ScrollTrigger on resize to handle mobile orientation changes
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});
