import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { heroState } from "./Hero/heroState.js";

// A dark curtain with the wordmark that sweeps up on a curve.
const Intro = ({ onComplete }) => {
    const ref = useRef(null);

    useGSAP(() => {
        if (!motionOK()) {
            gsap.set(ref.current, { display: "none" });
            heroState.intro = 1;
            onComplete();
            return;
        }

        gsap.timeline()
            .from(".intro-char", { yPercent: 120, duration: 1, stagger: 0.03, ease: "expo.out" })
            .from(".intro-meta", { opacity: 0, y: 10, duration: 0.6 }, "-=0.6")
            .to(".intro-char", { yPercent: -120, duration: 0.6, stagger: 0.015, ease: "expo.in" }, "+=0.5")
            .to(".intro-meta", { opacity: 0, duration: 0.3 }, "<")
            .add(onComplete)
            .to(ref.current, { yPercent: -100, duration: 1.2, ease: "expo.inOut" })
            .to(".intro-curve", { scaleY: 0, duration: 1.2, ease: "expo.inOut" }, "<")
            .to(heroState, { intro: 1, duration: 2.2, ease: "expo.out" }, "<0.35")
            .set(ref.current, { display: "none" });
    }, { scope: ref });

    return (
        <div ref={ref} className="intro" aria-hidden="true">
            <div className="intro-word">
                {"Patryk Konior".split("").map((char, index) => (
                    <span key={index} className="intro-char">{char === " " ? " " : char}</span>
                ))}
            </div>
            <p className="intro-meta mono">Portfolio — 2026 edition</p>
            <div className="intro-curve" />
        </div>
    );
};

export default Intro;
