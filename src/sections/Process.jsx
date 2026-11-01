import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { engagementTerms, processSteps } from "../constants/index.js";
import SectionHeading from "../components/SectionHeading.jsx";

// Client view: how a project runs, step by step, plus the commercial terms.
const Process = ({ index }) => {
    const ref = useRef(null);

    useGSAP(() => {
        if (!motionOK()) return;
        const timeline = gsap.timeline({ scrollTrigger: { trigger: ".process-steps", start: "top 75%" } });
        timeline
            .from(".process-track span", { scaleX: 0, duration: 1.6, ease: "expo.inOut" })
            .from(".process-step", { y: 50, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.2)
            .from(".process-dot", { scale: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2.5)" }, 0.3);

        gsap.from(".term", {
            y: 20,
            opacity: 0,
            duration: 0.9,
            stagger: 0.06,
            scrollTrigger: { trigger: ".terms", start: "top 90%" },
        });
    }, { scope: ref });

    return (
        <section id="process" ref={ref} className="process container-x section-space">
            <SectionHeading index={index} label="Process" title="How we'll <em>work</em> together" aside="B2B" />

            <div className="process-steps">
                <div className="process-track" aria-hidden="true"><span /></div>
                <ol>
                    {processSteps.map((step, stepIndex) => (
                        <li key={step.title} className="process-step">
                            <span className="process-dot" aria-hidden="true" />
                            <span className="mono text-accent">Step 0{stepIndex + 1}</span>
                            <h3>{step.title}</h3>
                            <p className="text-muted">{step.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>

            <ul className="terms">
                {engagementTerms.map((term) => (
                    <li key={term} className="term">
                        <span className="term-check" aria-hidden="true">✓</span>
                        {term}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Process;
