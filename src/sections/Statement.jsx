import { useRef } from "react";
import { gsap, SplitText, useGSAP, motionOK } from "../lib/motion.js";

const Pill = ({ icon, label }) => (
    <span className="inline-pill glass">
        <img src={icon} alt="" />
        {label}
    </span>
);

// One big sentence with tech chips set inline; words blur into focus as it scrolls through.
const Statement = () => {
    const ref = useRef(null);

    useGSAP(() => {
        if (!motionOK()) return;

        SplitText.create(".statement-text", {
            type: "words",
            wordsClass: "statement-word",
            autoSplit: true,
            onSplit: () => {
                // Pills reveal as a whole, in reading order with the words around them.
                const targets = [...ref.current.querySelectorAll(".statement-word, .inline-pill")]
                    .filter((el) => el.classList.contains("inline-pill") || !el.closest(".inline-pill"));
                return gsap.fromTo(targets, { opacity: 0.08, filter: "blur(8px)", y: 12 }, {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    stagger: 0.05,
                    ease: "none",
                    scrollTrigger: { trigger: ".statement-text", start: "top 80%", end: "bottom 55%", scrub: true },
                });
            },
        });
    }, { scope: ref });

    return (
        <section ref={ref} className="statement container">
            <p className="eyebrow mono"><span className="eyebrow-index">01</span> Manifesto</p>
            <p className="statement-text">
                I build <Pill icon="/images/tech/react.svg" label="React" /> interfaces
                and <Pill icon="/images/tech/elixir.svg" label="Elixir" /> real-time backends, then
                ship them with <Pill icon="/images/tech/docker.svg" label="Docker" /> straight to production,
                for teams and clients who care about <em>the details.</em>
            </p>
        </section>
    );
};

export default Statement;
