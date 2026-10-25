import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { services } from "../constants/index.js";
import SectionHeading from "../components/SectionHeading.jsx";

const Services = () => {
    const ref = useRef(null);

    useGSAP(() => {
        if (!motionOK()) return;
        const cards = gsap.utils.toArray(".service-card");

        // Each sticky card recedes as the next one slides over it.
        cards.slice(0, -1).forEach((card, index) => {
            gsap.to(card.querySelector(".service-card-inner"), {
                scale: 0.92,
                filter: "brightness(0.55)",
                rotateX: -4,
                ease: "none",
                scrollTrigger: { trigger: cards[index + 1], start: "top 65%", end: "top 15%", scrub: true },
            });
        });

        cards.forEach((card) => {
            gsap.from(card.querySelectorAll(".service-icon"), {
                scale: 0,
                rotate: -30,
                duration: 0.9,
                stagger: 0.07,
                ease: "back.out(2)",
                scrollTrigger: { trigger: card, start: "top 70%" },
            });
        });
    }, { scope: ref });

    return (
        <section id="services" ref={ref} className="services container-x section-space">
            <SectionHeading index="03" label="Services" title="What I can <em>build</em> for you" />

            <div className="service-stack">
                {services.map((service, index) => (
                    <div key={service.title} className="service-card" style={{ "--i": index }}>
                        <article className={`service-card-inner tone-${index % 4}`}>
                            <div className="service-card-top">
                                <span className="service-number">0{index + 1}</span>
                                <div className="flex gap-2">
                                    {service.icons.map((icon) => (
                                        <span key={icon} className="service-icon"><img src={icon} alt="" /></span>
                                    ))}
                                </div>
                            </div>
                            <div className="service-card-body">
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <ul className="service-points">
                                    {service.points.map((point) => <li key={point}>{point}</li>)}
                                </ul>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
