import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader.jsx";
import GlowCard from "../components/GlowCard.jsx";
import { services } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    useGSAP(() => {
        gsap.from(".service-card", {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: "#services",
                start: "top 70%",
            },
        });

        gsap.from(".service-icon", {
            scale: 0,
            rotate: -45,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2.5)",
            stagger: 0.06,
            delay: 0.4,
            scrollTrigger: {
                trigger: "#services",
                start: "top 70%",
            },
        });
    }, []);

    return (
        <section id="services" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="What I Can Build for You"
                    sub="🛠️ Services for companies and clients"
                />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 mt-16">
                    {services.map((service, index) => (
                        <GlowCard key={service.title} index={index} className="service-card">
                            <div className="flex flex-col gap-5 h-full">
                                <div className="flex gap-3">
                                    {service.icons.map((icon) => (
                                        <div
                                            key={icon}
                                            className="service-icon size-14 rounded-xl border border-black-50 bg-black-200 flex-center"
                                        >
                                            <img src={icon} alt="" className="size-8" />
                                        </div>
                                    ))}
                                </div>
                                <h3 className="font-semibold md:text-3xl text-2xl">{service.title}</h3>
                                <p className="text-white-50 text-lg">{service.desc}</p>
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
