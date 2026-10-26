import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { abilities, contactInfo, counterItems, logoIconsList, services } from "../constants/index.js";
import { ArrowUpRightIcon } from "../components/Icons.jsx";

// Each tile tilts towards the pointer and carries a soft spotlight under it.
const Tile = ({ area, className = "", children, as = "div", ...props }) => {
    const ref = useRef(null);
    const Tag = as;

    useEffect(() => {
        const tile = ref.current;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const rotateX = gsap.quickTo(tile, "rotationX", { duration: 0.6, ease: "power3" });
        const rotateY = gsap.quickTo(tile, "rotationY", { duration: 0.6, ease: "power3" });

        const handleMove = (event) => {
            const rect = tile.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            tile.style.setProperty("--mx", `${x * 100}%`);
            tile.style.setProperty("--my", `${y * 100}%`);
            rotateX((0.5 - y) * 6);
            rotateY((x - 0.5) * 6);
        };
        const handleLeave = () => {
            rotateX(0);
            rotateY(0);
        };
        tile.addEventListener("pointermove", handleMove);
        tile.addEventListener("pointerleave", handleLeave);
        return () => {
            tile.removeEventListener("pointermove", handleMove);
            tile.removeEventListener("pointerleave", handleLeave);
        };
    }, []);

    return (
        <Tag ref={ref} className={`tile ${className}`} style={{ gridArea: area }} {...props}>
            {children}
        </Tag>
    );
};

const Clock = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const parts = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Warsaw", hourCycle: "h23",
    }).formatToParts(now);
    const get = (type) => parts.find((part) => part.type === type)?.value ?? "00";
    const [h, m, s] = [Number(get("hour")), Number(get("minute")), Number(get("second"))];

    return (
        <div className="clock">
            <svg viewBox="0 0 100 100" className="clock-face" aria-hidden="true">
                <circle cx="50" cy="50" r="48" />
                {Array.from({ length: 12 }, (_, i) => (
                    <line key={i} x1="50" y1="6" x2="50" y2={i % 3 ? 10 : 14} transform={`rotate(${i * 30} 50 50)`} />
                ))}
                <line className="hand-h" x1="50" y1="50" x2="50" y2="27" transform={`rotate(${(h % 12) * 30 + m * 0.5} 50 50)`} />
                <line className="hand-m" x1="50" y1="50" x2="50" y2="16" transform={`rotate(${m * 6 + s * 0.1} 50 50)`} />
                <line className="hand-s" x1="50" y1="56" x2="50" y2="12" transform={`rotate(${s * 6} 50 50)`} />
                <circle cx="50" cy="50" r="2.5" className="hand-pin" />
            </svg>
            <div>
                <p className="tile-label mono">Local time · Chorzów</p>
                <p className="clock-digits">{get("hour")}:{get("minute")}<span className="text-muted">:{get("second")}</span></p>
            </div>
        </div>
    );
};

const ring = (items, radius) => items.map((item, index) => {
    const angle = (index / items.length) * Math.PI * 2;
    return { ...item, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
});

const Orbit = () => {
    const inner = ring(logoIconsList.slice(0, 5), 30);
    const outer = ring(logoIconsList.slice(5), 46);

    return (
        <div className="orbit" aria-hidden="true">
            <div className="orbit-ring orbit-ring-outer">
                {outer.map((item) => (
                    <span key={item.name} className="orbit-icon" style={{ left: `${50 + item.x}%`, top: `${50 + item.y}%` }}>
                        <img src={item.imgPath} alt="" />
                    </span>
                ))}
            </div>
            <div className="orbit-ring orbit-ring-inner">
                {inner.map((item) => (
                    <span key={item.name} className="orbit-icon" style={{ left: `${50 + item.x}%`, top: `${50 + item.y}%` }}>
                        <img src={item.imgPath} alt="" />
                    </span>
                ))}
            </div>
            <div className="orbit-core">
                <span className="orbit-number">45+</span>
                <span className="mono">tools in rotation</span>
            </div>
        </div>
    );
};

const Bento = () => {
    const ref = useRef(null);
    const [years, backend, frontend] = counterItems;

    useGSAP(() => {
        if (!motionOK()) return;
        gsap.from(".tile", {
            y: 80,
            opacity: 0,
            scale: 0.94,
            duration: 1.2,
            stagger: { each: 0.06, from: "start" },
            ease: "expo.out",
            scrollTrigger: { trigger: ".bento", start: "top 80%" },
        });
        const counter = { value: 0 };
        gsap.to(counter, {
            value: years.value,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: ".bento", start: "top 70%" },
            onUpdate: () => {
                const el = ref.current?.querySelector(".years-value");
                if (el) el.textContent = Math.round(counter.value);
            },
        });
    }, { scope: ref });

    return (
        <section id="about" ref={ref} className="bento-section container">
            <div className="section-head">
                <p className="eyebrow mono"><span className="eyebrow-index">03</span> About & services</p>
                <h2 className="section-title">One developer, <em>the whole stack</em></h2>
            </div>

            <div className="bento">
                <Tile area="years" className="tile-years">
                    <p className="tile-label mono">Commercial experience</p>
                    <p className="years-number"><span className="years-value">{years.value}</span><span className="text-accent">+</span></p>
                    <p className="tile-text">years shipping production software across {backend.detail.replaceAll(" · ", ", ")} on the backend and {frontend.detail.replaceAll(" · ", ", ")} on the front.</p>
                </Tile>

                <Tile area="orbit" className="tile-orbit">
                    <p className="tile-label mono">Toolbox</p>
                    <Orbit />
                </Tile>

                <Tile area="clock" className="tile-clock">
                    <Clock />
                </Tile>

                <Tile area="avail" className="tile-avail">
                    <span className="live-dot live-dot-lg" />
                    <div>
                        <p className="tile-label mono">Status</p>
                        <p className="tile-heading">Open to projects & full-time roles</p>
                        <p className="tile-text">{contactInfo.workMode}</p>
                    </div>
                </Tile>

                {services.map((service, index) => (
                    <Tile key={service.title} area={`s${index + 1}`} className="tile-service">
                        <div className="flex items-center justify-between">
                            <span className="mono text-muted">0{index + 1}</span>
                            <div className="service-icons">
                                {service.icons.map((icon) => <img key={icon} src={icon} alt="" />)}
                            </div>
                        </div>
                        <div>
                            <h3 className="tile-heading">{service.title}</h3>
                            <p className="tile-text service-desc">{service.desc}</p>
                            <ul className="service-points">
                                {service.points.map((point) => <li key={point}>{point}</li>)}
                            </ul>
                        </div>
                    </Tile>
                ))}

                <Tile area="how" className="tile-how">
                    <p className="tile-label mono">How I work</p>
                    <ol className="how-list">
                        {abilities.map((ability) => (
                            <li key={ability.title}>
                                <h3>{ability.title}</h3>
                                <p className="tile-text">{ability.desc}</p>
                            </li>
                        ))}
                    </ol>
                </Tile>

                <Tile area="lang" className="tile-lang">
                    <p className="tile-label mono">Languages</p>
                    <div className="lang-list">
                        {contactInfo.languages.split(" · ").map((language) => {
                            const [name, level] = language.split(" ");
                            return (
                                <p key={name}><span className="tile-heading">{name}</span> <span className="mono text-muted">{level}</span></p>
                            );
                        })}
                    </div>
                </Tile>

                <Tile as="a" href="#contact" area="cta" className="tile-cta" data-cursor="Let's go">
                    <p className="tile-label mono">Next step</p>
                    <p className="cta-text">Have a project in mind?</p>
                    <span className="cta-arrow"><ArrowUpRightIcon className="size-7" /></span>
                </Tile>
            </div>
        </section>
    );
};

export default Bento;
