import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/motion.js";

// An inverting disc: tiny over the page, big over links, and it shows a label for data-cursor targets.
const Cursor = () => {
    const ref = useRef(null);
    const [label, setLabel] = useState("");
    const [enabled] = useState(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches);

    useEffect(() => {
        if (!enabled) return;
        const cursor = ref.current;
        document.documentElement.classList.add("has-cursor");

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
        let shown = false;

        const handleMove = (event) => {
            if (!shown) {
                shown = true;
                gsap.set(cursor, { x: event.clientX, y: event.clientY });
                gsap.to(cursor, { opacity: 1, duration: 0.3 });
            }
            xTo(event.clientX);
            yTo(event.clientY);
        };

        const handleOver = (event) => {
            const labelled = event.target.closest("[data-cursor]");
            const interactive = event.target.closest("a, button, input, textarea, label, [role='button']");
            setLabel(labelled?.dataset.cursor ?? "");
            cursor.dataset.state = labelled ? "label" : interactive ? "hover" : "";
        };

        window.addEventListener("pointermove", handleMove, { passive: true });
        document.addEventListener("pointerover", handleOver);
        return () => {
            document.documentElement.classList.remove("has-cursor");
            window.removeEventListener("pointermove", handleMove);
            document.removeEventListener("pointerover", handleOver);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <div ref={ref} className="cursor" aria-hidden="true">
            <span>{label}</span>
        </div>
    );
};

export default Cursor;
