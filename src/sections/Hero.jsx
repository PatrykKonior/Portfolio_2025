import { useRef } from "react";
import { gsap, SplitText, useGSAP, motionOK } from "../lib/motion.js";
import { AUDIENCES, useAudience } from "../lib/audience.js";
import { audiences } from "../constants/index.js";
import Magnetic from "../components/Magnetic.jsx";

// Segmented control: "I have a project" / "I'm hiring". The thumb slides under the active option.
const AudienceSwitch = () => {
    const { audience, setAudience } = useAudience();

    return (
        <div className="audience-switch" role="radiogroup" aria-label="What brings you here?" style={{ "--active": AUDIENCES.indexOf(audience) }}>
            <span className="audience-thumb" aria-hidden="true" />
            {AUDIENCES.map((option) => (
                <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={audience === option}
                    className={audience === option ? "active" : ""}
                    onClick={() => setAudience(option)}
                >
                    {audiences[option].switchLabel}
                </button>
            ))}
        </div>
    );
};

const Hero = ({ ready }) => {
    const ref = useRef(null);
    const firstReveal = useRef(true);
    const { audience } = useAudience();
    const copy = audiences[audience];

    useGSAP(() => {
        if (!ready || !motionOK()) return;

        gsap.from(".hero-static", { y: 40, opacity: 0, duration: 1.4, stagger: 0.1, delay: 0.6 });
        gsap.from(".hero-line", { scaleX: 0, duration: 1.8, ease: "expo.inOut", delay: 0.3 });

        // Parallax out as the next section arrives.
        gsap.to(".hero-content", {
            yPercent: -18,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
    }, { scope: ref, dependencies: [ready] });

    // Runs on the first reveal and again whenever the visitor switches audience.
    useGSAP(() => {
        if (!ready || !motionOK()) return;
        const first = firstReveal.current;
        firstReveal.current = false;

        SplitText.create(".hero-title", {
            type: "lines,words",
            mask: "lines",
            linesClass: "sline",
            autoSplit: true,
            onSplit: (split) => gsap.from(split.words, {
                yPercent: 115,
                rotate: 4,
                duration: first ? 1.6 : 1.1,
                stagger: first ? 0.07 : 0.04,
                delay: first ? 0.15 : 0,
            }),
        });

        gsap.from(".hero-swap", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08, delay: first ? 0.7 : 0.1 });
    }, { scope: ref, dependencies: [ready, audience] });

    return (
        <section id="top" ref={ref} className="hero">
            <div className="hero-content container-x">
                <div className="hero-top">
                    <div className="hero-static">
                        <AudienceSwitch />
                    </div>
                    <span key={`eyebrow-${audience}`} className="mono text-muted hero-swap">{copy.eyebrow}</span>
                </div>

                {/* Keyed so each audience gets a fresh element for SplitText to work on. */}
                <h1 key={`title-${audience}`} className="hero-title" dangerouslySetInnerHTML={{ __html: copy.title }} />

                <div className="hero-line" />

                <div className="hero-bottom">
                    <p key={`intro-${audience}`} className="hero-intro hero-swap">{copy.intro}</p>

                    <div key={`avail-${audience}`} className="availability hero-swap">
                        <span className="pulse-dot" />
                        {copy.availability}
                    </div>

                    <div key={`cta-${audience}`} className="hero-ctas hero-swap">
                        <Magnetic>
                            <a
                                href={copy.primary.href}
                                className="pill pill-accent hero-primary"
                                {...(copy.primary.download ? { download: "" } : {})}
                            >
                                {copy.primary.label} <span aria-hidden="true">→</span>
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.45}>
                            <a href={copy.secondary.href} className="round-button" data-cursor="Explore">
                                <span>{copy.secondary.label}</span>
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                            </a>
                        </Magnetic>
                    </div>
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
