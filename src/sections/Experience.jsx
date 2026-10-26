import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, motionOK } from "../lib/motion.js";
import { expCards } from "../constants/index.js";

const DIGITS = "0123456789".split("");

// Four odometer columns; each one rolls to its digit.
const RollingYear = ({ year }) => (
    <div className="year" aria-hidden="true">
        {year.split("").map((digit, column) => (
            <span key={column} className="year-col">
                <span className="year-strip" data-column={column} data-digit={digit}>
                    {DIGITS.map((d) => <span key={d}>{d}</span>)}
                </span>
            </span>
        ))}
    </div>
);

const Experience = () => {
    const ref = useRef(null);
    const startYear = expCards[0].period.slice(0, 4);

    useGSAP(() => {
        const setYear = (year, company) => {
            year.split("").forEach((digit, column) => {
                gsap.to(`.year-strip[data-column="${column}"]`, {
                    yPercent: -Number(digit) * 10,
                    duration: motionOK() ? 1 : 0,
                    ease: "expo.inOut",
                    delay: column * 0.05,
                    overwrite: true,
                });
            });
            ref.current.querySelector(".year-company").textContent = company;
        };
        gsap.set(".year-strip", { yPercent: (i, el) => -Number(el.dataset.digit) * 10 });

        gsap.utils.toArray(".job").forEach((job, index) => {
            const { period, company } = expCards[index];
            ScrollTrigger.create({
                trigger: job,
                start: "top 55%",
                end: "bottom 55%",
                onToggle: (self) => self.isActive && setYear(period.slice(0, 4), company),
            });
            if (motionOK()) {
                gsap.from(job, { y: 80, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: job, start: "top 85%" } });
            }
        });

        if (motionOK()) {
            gsap.fromTo(".journey-progress span", { scaleY: 0 }, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: { trigger: ".jobs", start: "top 55%", end: "bottom 55%", scrub: true },
            });
        }
    }, { scope: ref });

    return (
        <section id="experience" ref={ref} className="journey container">
            <div className="section-head">
                <p className="eyebrow mono"><span className="eyebrow-index">04</span> Journey</p>
                <h2 className="section-title">Where I've <em>worked</em></h2>
            </div>

            <div className="journey-grid">
                <div className="journey-sticky">
                    <RollingYear year={startYear} />
                    <p className="year-company mono">{expCards[0].company}</p>
                    <div className="journey-progress" aria-hidden="true"><span /></div>
                </div>

                <ol className="jobs">
                    {expCards.map((job) => (
                        <li key={job.title} className="job glass">
                            <div className="job-head">
                                <span className="mono text-muted">{job.date}</span>
                                <span className="job-company">{job.company}</span>
                            </div>
                            <h3 className="job-title">{job.title}</h3>
                            <p className="job-summary">{job.summary}</p>
                            <ul className="job-list">
                                {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                            <ul className="chips">
                                {job.stack.map((tech) => <li key={tech} className="chip">{tech}</li>)}
                            </ul>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Experience;
