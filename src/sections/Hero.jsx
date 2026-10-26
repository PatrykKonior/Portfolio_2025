import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { heroState } from "../components/Hero/heroState.js";

// three.js ships in its own chunk so the page paints first.
const GlassScene = lazy(() => import("../components/Hero/GlassScene.jsx"));

const roles = ["Full-stack developer", "Elixir & Phoenix", "React & Svelte", "Node.js & .NET"];

const Hero = ({ ready }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(true);

    // Stop rendering the glass once the hero is off screen.
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useGSAP(() => {
        gsap.to(heroState, {
            progress: 1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });

        if (!ready || !motionOK()) return;

        gsap.from(".hero-ui", { y: 24, opacity: 0, duration: 1.2, stagger: 0.08, delay: 0.5, ease: "expo.out" });

        // Rotate through roles, rolling each one up and out.
        const items = gsap.utils.toArray(".role-item");
        gsap.set(items, { yPercent: 100, opacity: 1 });
        gsap.set(items[0], { yPercent: 0 });
        const cycle = gsap.timeline({ repeat: -1, delay: 2 });
        items.forEach((item, index) => {
            const next = items[(index + 1) % items.length];
            cycle
                .to(item, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "+=1.8")
                .fromTo(next, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "expo.inOut" }, "<");
        });

        gsap.to(".hero-overlay", {
            opacity: 0,
            y: -60,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top top", end: "50% top", scrub: true },
        });
    }, { scope: ref, dependencies: [ready] });

    return (
        <section id="top" ref={ref} className="hero">
            <div className="hero-canvas">
                <Suspense fallback={<h1 className="hero-fallback">Patryk<br />Konior</h1>}>
                    <GlassScene active={visible} />
                </Suspense>
            </div>

            <div className="hero-overlay">
                <div className="hero-row">
                    <p className="hero-ui mono">
                        <span className="role-window">
                            {roles.map((role) => <span key={role} className="role-item">{role}</span>)}
                        </span>
                    </p>
                    <p className="hero-ui mono text-right">Chorzów, Poland<br /><span className="text-muted">50.29° N, 18.95° E</span></p>
                </div>

                <h1 className="sr-only">Patryk Konior — Full-stack Developer</h1>

                <div className="hero-row hero-row-bottom">
                    <p className="hero-ui hero-lede">
                        I design and ship web apps end to end, from <em>database</em> to <em>pixel</em>.
                    </p>
                    <div className="hero-ui hero-badge glass">
                        <span className="live-dot" />
                        Available for new projects
                    </div>
                    <a href="#work" className="hero-ui hero-scroll mono" data-cursor="Scroll">
                        Scroll to explore
                        <span className="hero-scroll-line" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
