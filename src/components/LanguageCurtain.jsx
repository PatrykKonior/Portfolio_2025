import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gsap } from "../lib/motion.js";
import { dictionaries } from "../i18n/index.js";

// A cobalt curtain sweeps up over the page with the new language code, the content is swapped
// underneath it, and the curtain carries on upward. Visible mono labels then decode into the
// new language.
const LanguageCurtain = forwardRef((_, ref) => {
    const rootRef = useRef(null);
    const [target, setTarget] = useState("pl");
    const busy = useRef(false);

    useImperativeHandle(ref, () => ({
        play(next, swap) {
            if (busy.current) return;
            busy.current = true;
            flushSync(() => setTarget(next));

            const root = rootRef.current;
            gsap.timeline({ onComplete: () => { busy.current = false; } })
                .set(root, { display: "flex", clipPath: "inset(100% 0% 0% 0%)" })
                .set(".curtain-char", { yPercent: 110 })
                .set(".curtain-meta", { opacity: 0 })
                .to(root, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "expo.inOut" })
                .to(".curtain-char", { yPercent: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" }, "-=0.35")
                .to(".curtain-meta", { opacity: 1, duration: 0.4 }, "<")
                .add(swap)
                .to(".curtain-char", { yPercent: -110, duration: 0.55, stagger: 0.04, ease: "expo.in" }, "+=0.25")
                .to(".curtain-meta", { opacity: 0, duration: 0.3 }, "<")
                .to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "expo.inOut" }, "-=0.15")
                .add(scrambleVisibleLabels, "-=0.45")
                .set(root, { display: "none" });
        },
    }), []);

    return (
        <div ref={rootRef} className="lang-curtain" aria-hidden="true">
            <div className="curtain-code">
                {target.toUpperCase().split("").map((char, index) => (
                    <span key={index} className="curtain-char">{char}</span>
                ))}
            </div>
            <div className="curtain-meta mono">
                <span>{dictionaries[target === "pl" ? "en" : "pl"].switching}</span>
                <span>EN / PL</span>
            </div>
        </div>
    );
});

LanguageCurtain.displayName = "LanguageCurtain";

// Mono labels in view (plain text only, so no markup is lost) decode from random glyphs.
const scrambleVisibleLabels = () => {
    const viewport = window.innerHeight;
    document.querySelectorAll("main .mono, .navbar .mono, .nav-link .roll > span").forEach((element) => {
        if (element.children.length) return;
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport || !element.textContent.trim()) return;
        gsap.to(element, {
            duration: 0.9,
            scrambleText: { text: element.textContent, chars: "ABCDEFGHIJKLMNOPRSTUWXYZ0123456789/", speed: 0.6 },
        });
    });
};

export default LanguageCurtain;
