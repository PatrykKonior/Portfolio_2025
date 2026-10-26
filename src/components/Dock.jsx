import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import useLocalTime from "../hooks/useLocalTime.js";

const links = [
    { name: "Work", link: "#work" },
    { name: "About", link: "#about" },
    { name: "Journey", link: "#experience" },
    { name: "Contact", link: "#contact" },
];

// Floating liquid-glass navigation. A glass pill slides under the hovered or active link.
const Dock = ({ ready }) => {
    const dockRef = useRef(null);
    const indicatorRef = useRef(null);
    const linkRefs = useRef({});
    const [active, setActive] = useState("");
    const [hovered, setHovered] = useState("");
    const time = useLocalTime();

    useEffect(() => {
        const sections = links.map(({ link }) => document.querySelector(link)).filter(Boolean);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(`#${entry.target.id}`);
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach((section) => observer.observe(section));

        const hero = document.querySelector("#top");
        const heroObserver = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(""), { rootMargin: "-50% 0px -50% 0px" });
        if (hero) heroObserver.observe(hero);

        return () => {
            observer.disconnect();
            heroObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const current = linkRefs.current[hovered || active];
        const indicator = indicatorRef.current;
        if (!current) {
            gsap.to(indicator, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power3.out" });
            return;
        }
        gsap.to(indicator, {
            x: current.offsetLeft,
            width: current.offsetWidth,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.75)",
        });
    }, [active, hovered]);

    useGSAP(() => {
        if (!ready || !motionOK()) return;
        gsap.from(dockRef.current, { yPercent: 160, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.6 });
    }, { dependencies: [ready] });

    return (
        <nav ref={dockRef} className="dock glass" aria-label="Main" onPointerLeave={() => setHovered("")}>
            <a href="#top" className="dock-logo" aria-label="Back to top">PK</a>
            <div className="dock-links">
                <span ref={indicatorRef} className="dock-indicator" aria-hidden="true" />
                {links.map(({ name, link }) => (
                    <a
                        key={name}
                        ref={(el) => (linkRefs.current[link] = el)}
                        href={link}
                        className={`dock-link ${active === link ? "active" : ""}`}
                        onPointerEnter={() => setHovered(link)}
                        onFocus={() => setHovered(link)}
                        onBlur={() => setHovered("")}
                    >
                        {name}
                    </a>
                ))}
            </div>
            <span className="dock-time mono"><span className="live-dot" />{time}</span>
            <a href="#contact" className="dock-cta">Let's talk</a>
        </nav>
    );
};

export default Dock;
