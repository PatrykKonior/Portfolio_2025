import React, {useRef} from 'react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TitleHeader = ( { title, sub } ) => {
    const headerRef = useRef(null);

    useGSAP(() => {
        gsap.from(headerRef.current.children, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
            },
        });
    }, {scope: headerRef});

    return (
        <div ref={headerRef} className="flex flex-col items-center gap-5">
            <div className="hero-badge">
                <p>
                    {sub}
                </p>
            </div>
            <div className="font-semibold md:text-5xl text-3xl text-center">
                {title}
            </div>
        </div>
    )
}
export default TitleHeader
