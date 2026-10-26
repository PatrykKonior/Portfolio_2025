import { useRef } from "react";
import { gsap, SplitText, useGSAP, motionOK } from "../lib/motion.js";
import { heroCopy } from "../constants/index.js";
import Magnetic from "../components/Magnetic.jsx";

const Hero = ({ ready }) => {
    const ref = useRef(null);

    useGSAP(() => {
        if (!ready || !motionOK()) return;

        SplitText.create(".hero-title", {
            type: "lines,words",
            mask: "lines",
            linesClass: "sline",
            autoSplit: true,
            onSplit: (split) => gsap.from(split.words, {
                yPercent: 115,
                rotate: 4,
                duration: 1.6,
                stagger: 0.07,
                delay: 0.15,
            }),
        });

        gsap.from(".hero-reveal", { y: 40, opacity: 0, duration: 1.4, stagger: 0.1, delay: 0.7 });
        gsap.from(".hero-line", { scaleX: 0, duration: 1.8, ease: "expo.inOut", delay: 0.3 });

        // Parallax out as the next section arrives.
        gsap.to(".hero-content", {
            yPercent: -18,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
    }, { scope: ref, dependencies: [ready] });

    return (
        <section id="top" ref={ref} className="hero">
            <div className="hero-content container-x">
                <div className="hero-top hero-reveal">
                    <span className="mono">{heroCopy.eyebrow}</span>
                    <span className="mono text-muted">Based in Chorzów, Poland</span>
                </div>

                <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: heroCopy.title }} />

                <div className="hero-line" />

                <div className="hero-bottom">
                    <p className="hero-intro hero-reveal">{heroCopy.intro}</p>

                    <div className="availability hero-reveal">
                        <span className="pulse-dot" />
                        {heroCopy.availability}
                    </div>

                    <Magnetic className="hero-reveal" strength={0.45}>
                        <a href="#work" className="round-button" data-cursor="Explore">
                            <span>See work</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                        </a>
                    </Magnetic>
                </div>
            </div>

            <div className="scroll-hint mono" aria-hidden="true">
                <span>Scroll</span>
                <span className="scroll-hint-track"><span /></span>
            </div>
        </section>
    );
};

export default Hero;
