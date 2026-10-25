import React, {useEffect, useRef, useState} from 'react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {navLinks} from "../constants/index.js";
import {ArrowUpRightIcon, CloseIcon, MenuIcon} from "./Icons.jsx";

gsap.registerPlugin(ScrollTrigger);

const NavBar = () => {
    const headerRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        }

        handleScroll();
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        const sections = ["#hero", ...navLinks.map(({link}) => link), "#contact"]
            .map((selector) => document.querySelector(selector))
            .filter(Boolean);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`);
            });
        }, {rootMargin: "-45% 0px -50% 0px"});

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [])

    useEffect(() => {
        if (!menuOpen) return;

        const close = () => setMenuOpen(false);
        const handleKey = (event) => event.key === "Escape" && close();
        const handlePointer = (event) => !headerRef.current?.contains(event.target) && close();
        const desktop = window.matchMedia("(min-width: 1024px)");

        document.addEventListener("keydown", handleKey);
        document.addEventListener("pointerdown", handlePointer);
        desktop.addEventListener("change", close);

        return () => {
            document.removeEventListener("keydown", handleKey);
            document.removeEventListener("pointerdown", handlePointer);
            desktop.removeEventListener("change", close);
        };
    }, [menuOpen])

    useGSAP(() => {
        gsap.fromTo(headerRef.current, {y: -40, opacity: 0, transition: "none"}, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.2,
            clearProps: "transform,translate,opacity,transition",
        });

        gsap.fromTo(".nav-progress", {scaleX: 0}, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                start: 0,
                end: "max",
                scrub: 0.3,
            },
        });
    }, {scope: headerRef});

    const closeMenu = () => setMenuOpen(false);

    return (
        <header ref={headerRef} className={`navbar ${scrolled || menuOpen ? 'scrolled' : 'not-scrolled'}`}>
            <div className="inner">
                <a className="logo group" href="#hero" onClick={closeMenu}>
                    <span className="logo-mark">PK</span>
                    <span className="flex flex-col leading-tight">
                        <span className="text-white font-semibold">Patryk Konior</span>
                        <span className="text-xs text-blue-50 font-normal">Full-stack Developer</span>
                    </span>
                </a>

                <nav className="desktop" aria-label="Main">
                    <ul>
                        {navLinks.map(({ link, name}) => (
                            <li key={name}>
                                <a href={link} className={activeLink === link ? "active" : ""}>
                                    {name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-3">
                    <a href="#contact" className="contact-btn group">
                        Let's talk
                        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>

                    <button
                        type="button"
                        className="menu-toggle"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>

                <div className="nav-progress" />
            </div>

            <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-label="Mobile">
                <ul>
                    {navLinks.map(({link, name}) => (
                        <li key={name}>
                            <a
                                href={link}
                                onClick={closeMenu}
                                tabIndex={menuOpen ? 0 : -1}
                                className={activeLink === link ? "active" : ""}
                            >
                                {name}
                            </a>
                        </li>
                    ))}
                </ul>
                <a href="#contact" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1} className="mobile-cta">
                    Let's talk
                    <ArrowUpRightIcon className="size-4" />
                </a>
            </nav>
        </header>
    )
}
export default NavBar
