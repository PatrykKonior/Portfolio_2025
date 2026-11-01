import { useRef } from "react";
import { gsap, SplitText, useGSAP, motionOK } from "../lib/motion.js";
import { aboutText, abilities, counterItems } from "../constants/index.js";

const About = ({ index }) => {
    const ref = useRef(null);

    useGSAP(() => {
        if (!motionOK()) return;

        // Words light up one by one as the paragraph scrolls through the viewport.
        SplitText.create(".about-text", {
            type: "words",
            autoSplit: true,
            onSplit: (split) => gsap.fromTo(split.words, { opacity: 0.12 }, {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: ".about-text", start: "top 75%", end: "bottom 45%", scrub: true },
            }),
        });

        gsap.utils.toArray(".stat-value").forEach((element) => {
            const counter = { value: 0 };
            gsap.to(counter, {
                value: Number(element.dataset.value),
                duration: 2.2,
                ease: "power3.out",
                scrollTrigger: { trigger: element, start: "top 90%" },
                onUpdate: () => { element.textContent = Math.round(counter.value); },
            });
        });

        gsap.from(".stat, .principle", {
            y: 60,
            opacity: 0,
            duration: 1.3,
            stagger: 0.08,
            scrollTrigger: { trigger: ".stats", start: "top 85%" },
        });
    }, { scope: ref });

    return (
        <section id="about" ref={ref} className="about container-x section-space">
            <div className="section-meta">
                <span className="mono">({index})</span>
                <span className="mono">About</span>
            </div>

            <p className="about-text">{aboutText}</p>

            <div className="stats">
                {counterItems.map((item) => (
                    <div key={item.label} className="stat">
                        <div className="stat-number">
                            <span className="stat-value" data-value={item.value}>{item.value}</span>
                            <span className="text-accent">{item.suffix}</span>
                        </div>
                        <div>
                            <p className="stat-label">{item.label}</p>
                            <p className="stat-detail mono">{item.detail}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="principles">
                {abilities.map((ability, index) => (
                    <article key={ability.title} className="principle">
                        <span className="mono text-muted">/0{index + 1}</span>
                        <h3>{ability.title}</h3>
                        <p className="text-muted">{ability.desc}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default About;
