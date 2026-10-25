import React, {useRef} from 'react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {counterItems} from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            },
        });

        timeline.from(".counter-card", {
            x: -80,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
        });

        gsap.utils.toArray(".counter-value").forEach((element, index) => {
            const counter = {value: 0};
            timeline.to(counter, {
                value: Number(element.dataset.value),
                duration: 1.6,
                ease: "power2.out",
                onUpdate: () => {
                    element.textContent = Math.round(counter.value);
                },
            }, 0.2 + index * 0.12);
        });
    }, {scope: containerRef});

    return (
        <div id="counter" ref={containerRef} className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item) => (
                    <div key={item.label} className="counter-card">
                        <div className="text-white text-5xl font-bold mb-2">
                            <span className="counter-value" data-value={item.value}>0</span>
                            {item.suffix}
                        </div>
                        <div className="text-white-50 text-lg">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AnimatedCounter
