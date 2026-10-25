import React, {useRef} from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../constants/index.js";
import ArchitectureDiagram from "../components/ArchitectureDiagram.jsx";

gsap.registerPlugin(ScrollTrigger);

const ProjectLinks = ({ links }) => (
    <div className="flex flex-wrap gap-3">
        {links.map((link) => (
            <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
            >
                {link.label} on GitHub ↗
            </a>
        ))}
    </div>
);

const ProjectTags = ({ tags }) => (
    <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
            <li key={tag} className="stack-chip">{tag}</li>
        ))}
    </ul>
);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const [mainProject, ...otherProjects] = projects;

    useGSAP(() => {
        const isDesktop = window.matchMedia("(min-width: 1280px)").matches;

        gsap.utils.toArray(".showcase-card").forEach((card, index) => {
            const fromLeft = index === 0 || !isDesktop;

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
            });

            timeline
                .from(card, {
                    x: fromLeft ? -100 : 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: isDesktop ? index * 0.15 : 0,
                })
                .from(card.querySelectorAll(".arch-node"), {
                    y: 20,
                    scale: 0.85,
                    opacity: 0,
                    duration: 0.45,
                    ease: "back.out(2)",
                    stagger: 0.1,
                }, "-=0.5")
                .from(card.querySelectorAll(".stack-chip"), {
                    y: 12,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.04,
                }, "-=0.3");
        });
    }, {scope: sectionRef});

    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    <div className="showcase-card first-project-wrapper">
                        <div className="image-wrapper">
                            <ArchitectureDiagram architecture={mainProject.architecture} />
                        </div>
                        <div className="text-content">
                            <h2>{mainProject.title}</h2>
                            <p className="text-white-50 md:text-xl">{mainProject.desc}</p>
                            <ProjectTags tags={mainProject.tags} />
                            <ProjectLinks links={mainProject.links} />
                        </div>
                    </div>

                    <div className="project-list-wrapper">
                        {otherProjects.map((project) => (
                            <div key={project.title} className="showcase-card project">
                                <div className="image-wrapper">
                                    <ArchitectureDiagram architecture={project.architecture} compact />
                                </div>
                                <h2>{project.title}</h2>
                                <p className="text-white-50">{project.desc}</p>
                                <ProjectLinks links={project.links} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection
