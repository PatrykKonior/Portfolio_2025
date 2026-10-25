import React, {useRef} from 'react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {abilities} from "../constants/index.js";
import GlowCard from "../components/GlowCard.jsx";

gsap.registerPlugin(ScrollTrigger);

const entryOffsets = [{x: -120, y: 0}, {x: 0, y: 100}, {x: 120, y: 0}];

const FeatureCards = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
        });

        // fromTo with explicit end values: CSS hover transitions on these elements would
        // otherwise make GSAP read a mid-transition transform as the end state.
        gsap.utils.toArray(".feature-card").forEach((card, index) => {
            timeline.fromTo(card, {
                ...entryOffsets[index % entryOffsets.length],
                opacity: 0,
                transition: "none",
            }, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                clearProps: "transform,translate,transition",
            }, index * 0.12);
        });

        timeline.fromTo(".feature-icon", {
            scale: 0,
            rotate: -90,
            transition: "none",
        }, {
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(2)",
            stagger: 0.12,
            clearProps: "transform,scale,rotate,transition",
        }, 0.4);
    }, {scope: containerRef});

    return (
        <div ref={containerRef} className="w-full padding-x-lg">
            <div className="mx-auto grid-3-cols">
                {abilities.map(({imgPath, title, desc}, index) => (
                    <GlowCard key={title} index={index} className="feature-card">
                        <div className="flex flex-col gap-4">
                            <div className="feature-icon">
                                <img src={imgPath} alt="" className="size-8" />
                            </div>
                            <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
                            <p className="text-white-50 text-lg">
                                {desc}
                            </p>
                        </div>
                    </GlowCard>
                ))}
            </div>
        </div>
    )
}
export default FeatureCards
