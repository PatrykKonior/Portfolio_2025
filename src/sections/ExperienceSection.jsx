import React from 'react'
import TitleHeader from "../components/TitleHeader.jsx";
import {expCards} from "../constants/index.js";
import GlowCard from "../components/GlowCard.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
    useGSAP(() => {
        gsap.utils.toArray('.timeline-card').forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: 'left left',
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                }
            })

            gsap.from(card.querySelectorAll('.stack-chip'), {
                y: 16,
                scale: 0.8,
                opacity: 0,
                duration: 0.4,
                ease: "back.out(2)",
                stagger: 0.04,
                delay: 0.6,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                }
            })
        })

        gsap.to('.timeline', {
            scaleY: 0,
            transformOrigin: 'bottom bottom',
            ease: 'none',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center',
                end: '70% center',
                scrub: 0.5,
            },
        })

        gsap.utils.toArray('.expText').forEach((text) => {
            gsap.from(text, {
                xPercent: 0,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: 'top 60%'
                }
            })
        })
    }, []);

    return (
        <section id="experience" className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader title="Professional Work Experience" sub="💼 My Career Overview"/>
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards.map((card, index) => (
                            <div key={card.title} className="exp-card-wrapper">
                                <div className="xl:w-2/6">
                                    <GlowCard card={card} index={index}>
                                        <p className="font-semibold text-xl">{card.company}</p>
                                        <p className="text-[#839cb2] italic mt-6 mb-3">Tech stack</p>
                                        <ul className="flex flex-wrap gap-2">
                                            {card.stack.map((tech) => (
                                                <li key={tech} className="stack-chip">{tech}</li>
                                            ))}
                                        </ul>
                                    </GlowCard>
                                </div>

                                <div className="xl:w-4/6">
                                    <div className="flex items-start">
                                        <div className="timeline-wrapper">
                                            <div className="timeline"/>
                                            <div className="gradient-line w-1 h-full"/>
                                        </div>

                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                            <div className="timeline-logo">
                                                <span className="font-bold md:text-xl text-xs">{card.logoText}</span>
                                            </div>
                                            <div>
                                                <h1 className="font-semibold text-3xl">
                                                    {card.title}
                                                </h1>
                                                <p className="my-5 text-white-50">
                                                    🗓️ {card.date}
                                                </p>
                                                <p className="text-[#839cb2] italic">
                                                    Responsibilities
                                                </p>
                                                <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                                                    {card.responsibilities.map((responsibility) => (
                                                        <li key={responsibility} className="text-lg">
                                                            {responsibility}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ExperienceSection
