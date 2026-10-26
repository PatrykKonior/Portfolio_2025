import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { contactInfo } from "../constants";
import Magnetic from "../components/Magnetic.jsx";
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from "../components/Icons";

const lines = ["Let's work", "together"];

// Each letter swells in weight and width as the pointer gets close to it.
const useProximityType = (containerRef) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!motionOK() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const chars = [...container.querySelectorAll(".prox-char")];
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;

    const render = () => {
      frame = 0;
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const distance = Math.hypot(pointer.x - (rect.left + rect.width / 2), pointer.y - (rect.top + rect.height / 2));
        const t = Math.max(0, 1 - distance / 420);
        const eased = t * t * (3 - 2 * t);
        char.style.fontVariationSettings = `"wght" ${Math.round(300 + eased * 500)}, "wdth" ${Math.round(75 + eased * 25)}`;
      });
    };

    const handleMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [containerRef]);
};

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useProximityType(titleRef);

  useGSAP(() => {
    if (!motionOK()) return;
    gsap.from(".prox-char", {
      yPercent: 110,
      duration: 1.2,
      stagger: 0.025,
      ease: "expo.out",
      scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
    });
    gsap.from(".contact-reveal", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: ".contact-grid", start: "top 85%" },
    });
  }, { scope: sectionRef });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact container">
      <p className="eyebrow mono"><span className="eyebrow-index">05</span> Contact</p>

      <h2 ref={titleRef} className="contact-title" aria-label={lines.join(" ")}>
        {lines.map((line, lineIndex) => (
          <span key={line} className="contact-line" aria-hidden="true">
            {line.split("").map((char, index) => (
              <span key={index} className={`prox-char ${lineIndex === 1 ? "prox-accent" : ""}`}>
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        ))}
      </h2>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-reveal">
            <p className="mono text-muted">Write to me</p>
            <div className="contact-email-row">
              <a href={`mailto:${contactInfo.email}`} className="contact-email" data-cursor="Email">{contactInfo.email}</a>
              <button type="button" onClick={handleCopyEmail} className="button-ghost" aria-label="Copy email address">
                {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="contact-links contact-reveal">
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link glass">
              <span className="mono text-muted">LinkedIn</span>
              <span>in/patrykkonior</span>
              <ArrowUpRightIcon className="size-5" />
            </a>
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="contact-link glass">
              <span className="mono text-muted">GitHub</span>
              <span>PatrykKonior</span>
              <ArrowUpRightIcon className="size-5" />
            </a>
          </div>

          <p className="contact-reveal text-muted">
            {contactInfo.location} · {contactInfo.workMode} · {contactInfo.languages}
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form glass contact-reveal">
          <div className="field">
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder=" " required />
            <label htmlFor="name">Your name or company</label>
          </div>
          <div className="field">
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder=" " required />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="field">
            <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder=" " rows="4" required />
            <label htmlFor="message">Tell me about your project or role</label>
          </div>

          <div className="contact-submit">
            <p role="status" aria-live="polite" className="text-sm">
              {status === "sent" && <span className="text-accent">Message sent. Thanks, I'll get back to you soon.</span>}
              {status === "error" && (
                <span className="text-rose-600">The message couldn't be sent. Email me directly at {contactInfo.email}.</span>
              )}
            </p>
            <Magnetic strength={0.35}>
              <button type="submit" className="send-button" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
                <ArrowUpRightIcon className="size-5" />
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
