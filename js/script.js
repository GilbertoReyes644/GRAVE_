document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Preloader Animación de salida con GSAP
    window.addEventListener("load", () => {
        gsap.to("#preloader", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                document.getElementById("preloader").style.display = "none";
                initHeroAnimation();
            }
        });
    });

    // 2. Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 3. Navegación Suave por Anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement);
            }
        });
    });

    // 4. Animación Inicial Hero Tipográfico
    function initHeroAnimation() {
        const heroTl = gsap.timeline();

        heroTl.from(".star-svg", {
            scale: 0,
            rotate: -180,
            duration: 0.9,
            ease: "back.out(1.7)"
        })
        .from("#hero-tagline", {
            y: 15,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.3");
    }

    // ScrollTriggers
    gsap.to("#main-title", {
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.3
        },
        scale: 1.12,
        opacity: 0.2,
        y: -25
    });

    gsap.from("#shield-box", {
        scrollTrigger: {
            trigger: "#shield-sec",
            start: "top 85%",
        },
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out"
    });

    gsap.from(".pilar-card", {
        scrollTrigger: {
            trigger: "#pilars",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out"
    });

    // 5. Indicador de Horario/Disponibilidad en Tiempo Real en UPMH
    const updateLiveStatus = () => {
        const dot = document.getElementById("status-dot");
        const text = document.getElementById("status-text");
        const currentHour = new Date().getHours();

        if (currentHour >= 8 && currentHour < 18) {
            dot.className = "status-dot active";
            text.textContent = "DISPONIBLE HOY EN UPMH";
            text.style.color = "#4CAF50";
        } else {
            dot.className = "status-dot inactive";
            text.textContent = "ENTREGAS PROGRAMADAS PARA MAÑANA";
            text.style.color = "#FFC107";
        }
    };
    updateLiveStatus();

    // Año Footer
    const yearEl = document.getElementById("year");
    if(yearEl) yearEl.textContent = new Date().getFullYear();
});