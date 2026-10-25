import { useRef, useState } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { expCards } from "../constants/index.js";
import SectionHeading from "../components/SectionHeading.jsx";

const ExperienceRow = ({ job, open, onToggle, id }) => {
    const panelRef = useRef(null);

    useGSAP(() => {
        const panel = panelRef.current;
        if (!motionOK()) {
            gsap.set(panel, { height: open ? "auto" : 0 });
            return;
        }
        gsap.to(panel, { height: open ? "auto" : 0, duration: 0.9, ease: "expo.inOut" });
        if (open) {
            gsap.fromTo(panel.querySelectorAll("li"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.025, delay: 0.25 });
        }
    }, { dependencies: [open] });

    return (
        <li className={`exp-row ${open ? "open" : ""}`}>
            <button
                type="button"
                className="exp-row-head"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={id}
            >
                <span className="exp-fill" aria-hidden="true" />
                <span className="mono exp-date">{job.period}</span>
                <span className="exp-role">{job.title}</span>
                <span className="exp-company">{job.company}</span>
                <span className="exp-toggle" aria-hidden="true" />
            </button>

            <div id={id} ref={panelRef} className="exp-panel" style={{ height: 0 }}>
                <div className="exp-panel-inner">
                    <div>
                        <p className="exp-summary">{job.summary}</p>
                        <p className="mono text-muted mt-6">{job.date}</p>
                    </div>
                    <ul className="exp-list">
                        {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <ul className="chips exp-stack">
                        {job.stack.map((tech) => <li key={tech} className="chip">{tech}</li>)}
                    </ul>
                </div>
            </div>
        </li>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const [openIndex, setOpenIndex] = useState(0);

    useGSAP(() => {
        if (!motionOK()) return;
        gsap.from(".exp-row", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
            scrollTrigger: { trigger: ".exp-list-wrap", start: "top 80%" },
        });
    }, { scope: ref });

    return (
        <section id="experience" ref={ref} className="experience container-x section-space">
            <SectionHeading index="04" label="Experience" title="Where I've <em>worked</em>" aside="2024 — Now" />

            <ul className="exp-list-wrap">
                {expCards.map((job, index) => (
                    <ExperienceRow
                        key={job.title}
                        id={`exp-panel-${index}`}
                        job={job}
                        open={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Experience;
