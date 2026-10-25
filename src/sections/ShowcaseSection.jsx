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
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);
    const [mainProject, ...otherProjects] = projects;

    useGSAP(() => {
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 });

        const cards = [project1Ref.current, project2Ref.current, project3Ref.current];

        cards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom-=100'
                    }
                })
        })
    }, []);

    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    <div className="first-project-wrapper" ref={project1Ref}>
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

                    <div className="project-list-wrapper overflow-hidden">
                        {otherProjects.map((project, index) => (
                            <div
                                key={project.title}
                                className="project flex flex-col gap-4"
                                ref={index === 0 ? project2Ref : project3Ref}
                            >
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
