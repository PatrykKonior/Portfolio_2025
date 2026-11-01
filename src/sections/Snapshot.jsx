import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { audiences, contactInfo, quickFacts } from "../constants/index.js";
import SectionHeading from "../components/SectionHeading.jsx";
import { ArrowUpRightIcon } from "../components/Icons.jsx";

// Recruiter view: everything a hiring manager scans for, on one screen.
const Snapshot = ({ index }) => {
    const ref = useRef(null);
    const cv = audiences.hiring.primary;

    useGSAP(() => {
        if (!motionOK()) return;
        gsap.from(".fact", {
            y: 40,
            opacity: 0,
            duration: 1.1,
            stagger: 0.05,
            scrollTrigger: { trigger: ".facts", start: "top 85%" },
        });
    }, { scope: ref });

    return (
        <section id="snapshot" ref={ref} className="snapshot container-x section-space">
            <SectionHeading index={index} label="Snapshot" title="The short <em>version</em>" aside="For recruiters" />

            <dl className="facts">
                {quickFacts.map((fact) => (
                    <div key={fact.label} className="fact">
                        <dt className="mono text-muted">{fact.label}</dt>
                        <dd>{fact.value}</dd>
                    </div>
                ))}
            </dl>

            <div className="snapshot-actions">
                <a href={cv.href} className="pill pill-accent" {...(cv.download ? { download: "" } : {})}>
                    {cv.label} <span aria-hidden="true">{cv.download ? "↓" : "→"}</span>
                </a>
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="pill">
                    LinkedIn <ArrowUpRightIcon className="size-4" />
                </a>
                <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="pill">
                    GitHub <ArrowUpRightIcon className="size-4" />
                </a>
            </div>
        </section>
    );
};

export default Snapshot;
