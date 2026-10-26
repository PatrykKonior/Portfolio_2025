import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { lockScroll } from "../lib/smoothScroll.js";
import { projects, contactInfo } from "../constants/index.js";
import ArchitectureDiagram from "../components/ArchitectureDiagram.jsx";
import { ArrowUpRightIcon, CloseIcon } from "../components/Icons.jsx";

const ProjectDrawer = ({ project, index, onClose }) => {
    const ref = useRef(null);

    useEffect(() => {
        lockScroll(true);
        const handleKey = (event) => event.key === "Escape" && onClose();
        document.addEventListener("keydown", handleKey);
        ref.current.querySelector(".drawer-close").focus();
        return () => {
            lockScroll(false);
            document.removeEventListener("keydown", handleKey);
        };
    }, [onClose]);

    useGSAP(() => {
        if (!motionOK()) return;
        gsap.timeline()
            .from(".drawer-backdrop", { opacity: 0, duration: 0.5, ease: "power2.out" })
            .from(".drawer-panel", { xPercent: 105, duration: 0.9, ease: "expo.out" }, 0)
            .from(".drawer-reveal", { y: 30, opacity: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 0.25);
    }, { scope: ref });

    // Portalled to <body> so it sits above the dock instead of inside <main>'s stacking context.
    return createPortal(
        <div ref={ref} className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
            <div className="drawer-backdrop" onClick={onClose} />
            <aside className="drawer-panel glass" data-lenis-prevent>
                <div className="drawer-top drawer-reveal">
                    <span className="mono text-muted">Case 0{index + 1} / 0{projects.length}</span>
                    <button type="button" className="drawer-close" onClick={onClose} aria-label="Close project">
                        <CloseIcon />
                    </button>
                </div>
                <h3 id="drawer-title" className="drawer-title drawer-reveal">{project.title}</h3>
                <p className="drawer-type mono drawer-reveal">{project.year}</p>
                <div className="drawer-visual drawer-reveal" style={{ "--tint": project.tint }}>
                    <ArchitectureDiagram architecture={project.architecture} />
                </div>
                <p className="drawer-desc drawer-reveal">{project.desc}</p>
                <ul className="chips drawer-reveal">
                    {project.tags.map((tag) => <li key={tag} className="chip">{tag}</li>)}
                </ul>
                <div className="drawer-links drawer-reveal">
                    {project.links.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="button-dark">
                            {link.label} on GitHub <ArrowUpRightIcon className="size-4" />
                        </a>
                    ))}
                </div>
            </aside>
        </div>,
        document.body,
    );
};

// A typographic index of projects. On desktop a preview card trails the pointer over the list.
const Work = () => {
    const ref = useRef(null);
    const previewRef = useRef(null);
    const [hovered, setHovered] = useState(-1);
    const [openIndex, setOpenIndex] = useState(-1);
    const closeDrawer = useCallback(() => setOpenIndex(-1), []);

    useGSAP(() => {
        if (!motionOK()) return;
        gsap.from(".work-row", {
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: ".work-list", start: "top 80%" },
        });
        gsap.from(".work-title-line", {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.4,
            stagger: 0.1,
            ease: "expo.inOut",
            scrollTrigger: { trigger: ".work-list", start: "top 80%" },
        });
    }, { scope: ref });

    useEffect(() => {
        const preview = previewRef.current;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
        const rotateTo = gsap.quickTo(preview, "rotate", { duration: 0.8, ease: "power3" });
        let lastX = 0;
        const handleMove = (event) => {
            xTo(event.clientX);
            yTo(event.clientY);
            rotateTo(gsap.utils.clamp(-12, 12, (event.clientX - lastX) * 0.6));
            lastX = event.clientX;
        };
        window.addEventListener("pointermove", handleMove, { passive: true });
        return () => window.removeEventListener("pointermove", handleMove);
    }, []);

    useEffect(() => {
        gsap.to(previewRef.current, {
            scale: hovered >= 0 ? 1 : 0,
            opacity: hovered >= 0 ? 1 : 0,
            duration: 0.5,
            ease: hovered >= 0 ? "back.out(1.6)" : "power3.out",
        });
    }, [hovered]);

    const active = projects[hovered] ?? projects[0];

    return (
        <section id="work" ref={ref} className="work container">
            <div className="section-head">
                <p className="eyebrow mono"><span className="eyebrow-index">02</span> Selected work</p>
                <h2 className="section-title">Things I've <em>built</em></h2>
            </div>

            <ul className="work-list" onPointerLeave={() => setHovered(-1)}>
                {projects.map((project, index) => (
                    <li key={project.title} className="work-row">
                        <span className="work-title-line" aria-hidden="true" />
                        <button
                            type="button"
                            className="work-button"
                            onPointerEnter={() => setHovered(index)}
                            onClick={() => setOpenIndex(index)}
                            data-cursor="Open"
                        >
                            <span className="work-index mono">0{index + 1}</span>
                            <span className="work-name">{project.title}</span>
                            <span className="work-meta mono">{project.year}</span>
                            <span className="work-arrow" aria-hidden="true"><ArrowUpRightIcon className="size-5" /></span>
                        </button>
                    </li>
                ))}
                <li className="work-row">
                    <span className="work-title-line" aria-hidden="true" />
                    <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="work-button work-more" data-cursor="GitHub">
                        <span className="work-index mono">++</span>
                        <span className="work-name">More on GitHub</span>
                        <span className="work-meta mono">github.com/PatrykKonior</span>
                        <span className="work-arrow" aria-hidden="true"><ArrowUpRightIcon className="size-5" /></span>
                    </a>
                </li>
            </ul>

            <div ref={previewRef} className="work-preview" style={{ "--tint": active.tint }} aria-hidden="true">
                <ArchitectureDiagram architecture={active.architecture} />
            </div>

            {openIndex >= 0 && (
                <ProjectDrawer project={projects[openIndex]} index={openIndex} onClose={closeDrawer} />
            )}
        </section>
    );
};

export default Work;
