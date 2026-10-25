import React, {useRef} from 'react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {logoIconsList} from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const LogoIcon = ({icon}) => {
    return (
        <div className="flex-none flex-center flex-col gap-3 marquee-item md:px-6 px-3">
            <img src={icon.imgPath} alt={icon.name} className="md:size-16 size-12"/>
            <p className="text-white-50 text-sm">{icon.name}</p>
        </div>
    )
}

const LogoSection = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.from(sectionRef.current, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90%",
            },
        });
    }, {scope: sectionRef});

    return (
        <div ref={sectionRef} className="md:my-20 my-10 relative">
            <div className="gradient-edge"/>
            <div className="gradient-edge"/>

            <div className="marquee h-52">
                <div className="marquee-box">
                    {logoIconsList.map((icon, index) => (
                        <LogoIcon key={index} icon={icon}/>
                    ))}

                    {logoIconsList.map((icon, index) => (
                        <LogoIcon key={index} icon={icon}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default LogoSection
