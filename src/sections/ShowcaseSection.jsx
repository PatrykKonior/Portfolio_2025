import React, {useRef} from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 });
    }, []);

    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/* LEFT SIDE */}
                    <div className="first-project-wrapper" ref={project1Ref}>
                        <div className="image-wrapper">
                            <img src="/images/project1.png" alt="project1" />
                        </div>
                        <div className="text-content">
                            <h2>Powerful, User-Friendly App!</h2>
                            <p className="text-white-50 md:text-xl">
                                An app build with React Native, Expo and Tailwind for a fast, user-friendly experience.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={project2Ref}>
                            <div className="image-wrapper bg-[#ffefdb]">
                                <img src="/images/project2.png" alt="project2" />
                            </div>
                            <h2>
                                Powerful, User-Friendly App!
                            </h2>
                        </div>

                        <div className="project" ref={project3Ref}>
                            <div className="image-wrapper bg-[#ffe7db]">
                                <img src="/images/project3.png" alt="project3" />
                            </div>
                            <h2>
                                Powerful, User-Friendly App!
                            </h2>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection
