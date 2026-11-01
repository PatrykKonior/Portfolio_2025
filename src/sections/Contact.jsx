import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { gsap, SplitText, useGSAP, motionOK } from "../lib/motion.js";
import { contactInfo } from "../constants";
import { useAudience } from "../lib/audience.js";
import Magnetic from "../components/Magnetic.jsx";
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from "../components/Icons";

// Questions that change with who is writing: a client with a project, or a company hiring.
const formCopy = {
  clients: {
    status: "Booking new projects",
    title: ["Let's build", "<em>something</em> great."],
    nameLabel: "Your name or company",
    messageLabel: "Tell me about your project",
    choices: [
      { key: "projectType", label: "What do you need?", options: ["Web app", "API & backend", "DevOps & deployment", "Performance & SEO", "Something else"] },
      { key: "budget", label: "Budget", options: ["< €5k", "€5k–15k", "€15k+", "Not sure yet"] },
    ],
  },
  hiring: {
    status: "Open to B2B & full-time",
    title: ["Let's talk", "about the <em>role.</em>"],
    nameLabel: "Your name",
    messageLabel: "Tell me about the role and the team",
    company: true,
    choices: [
      { key: "contract", label: "Type of engagement", options: ["B2B contract", "Full-time employment", "Open to both"] },
    ],
  },
};

const ChoiceGroup = ({ choice, value, onChange }) => (
  <fieldset className="choice-group">
    <legend className="mono text-muted">{choice.label}</legend>
    <div className="choice-options">
      {choice.options.map((option) => (
        <button
          key={option}
          type="button"
          className={`choice ${value === option ? "active" : ""}`}
          aria-pressed={value === option}
          onClick={() => onChange(value === option ? "" : option)}
        >
          {option}
        </button>
      ))}
    </div>
  </fieldset>
);

const Contact = ({ index }) => {
  const { audience } = useAudience();
  const copy = formCopy[audience];
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [choices, setChoices] = useState({});

  // Everything lands in the existing {{message}} template variable, so EmailJS needs no changes.
  const details = [
    `Visiting as: ${audience === "hiring" ? "company hiring" : "client with a project"}`,
    ...(copy.company && form.company ? [`Company: ${form.company}`] : []),
    ...copy.choices.filter((choice) => choices[choice.key]).map((choice) => `${choice.label}: ${choices[choice.key]}`),
  ];
  const composedMessage = `${details.join("\n")}\n\n${form.message}`;

  useGSAP(() => {
    if (!motionOK()) return;

    SplitText.create(".contact-title", {
      type: "lines,chars",
      mask: "lines",
      linesClass: "sline",
      autoSplit: true,
      onSplit: (split) => gsap.from(split.chars, {
        yPercent: 120,
        duration: 1.3,
        stagger: 0.02,
        scrollTrigger: { trigger: ".contact-title", start: "top 80%" },
      }),
    });

    gsap.from(".contact-reveal", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.08,
      scrollTrigger: { trigger: ".contact-grid", start: "top 80%" },
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

      setForm({ name: "", email: "", company: "", message: "" });
      setChoices({});
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact container-x section-space">
      <div className="section-meta">
        <span className="mono">({index})</span>
        <span className="mono">Contact</span>
        <span className="mono ms-auto availability-inline"><span className="pulse-dot" /> {copy.status}</span>
      </div>

      <h2 className="contact-title" dangerouslySetInnerHTML={{ __html: copy.title.join("<br />") }} />

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-reveal">
            <p className="mono text-muted mb-3">Write to me</p>
            <div className="contact-email-row">
              <a href={`mailto:${contactInfo.email}`} className="contact-email" data-cursor="Email">
                {contactInfo.email}
              </a>
              <button type="button" onClick={handleCopyEmail} className="pill" aria-label="Copy email address">
                {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <ul className="contact-socials contact-reveal">
            {[
              { label: "LinkedIn", value: "in/patrykkonior", href: contactInfo.linkedin },
              { label: "GitHub", value: "PatrykKonior", href: contactInfo.github },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="contact-social">
                  <span className="mono text-muted">{link.label}</span>
                  <span>{link.value}</span>
                  <ArrowUpRightIcon className="size-5 contact-social-arrow" />
                </a>
              </li>
            ))}
          </ul>

          <dl className="contact-facts contact-reveal">
            <div><dt className="mono text-muted">Location</dt><dd>{contactInfo.location}</dd></div>
            <div><dt className="mono text-muted">Work mode</dt><dd>{contactInfo.workMode}</dd></div>
            <div><dt className="mono text-muted">Languages</dt><dd>{contactInfo.languages}</dd></div>
          </dl>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <div className="field contact-reveal">
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder=" " required />
            <label htmlFor="name">{copy.nameLabel}</label>
          </div>
          {copy.company && (
            <div className="field contact-reveal">
              <input type="text" id="company" value={form.company} name="company" onChange={handleChange} placeholder=" " />
              <label htmlFor="company">Company</label>
            </div>
          )}
          <div className="field contact-reveal">
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder=" " required />
            <label htmlFor="email">Email address</label>
          </div>
          {copy.choices.map((choice) => (
            <div key={choice.key} className="contact-reveal">
              <ChoiceGroup
                choice={choice}
                value={choices[choice.key] ?? ""}
                onChange={(value) => setChoices({ ...choices, [choice.key]: value })}
              />
            </div>
          ))}
          <div className="field contact-reveal">
            <textarea id="message" name="message_body" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder=" " rows="4" required />
            <label htmlFor="message">{copy.messageLabel}</label>
          </div>
          <input type="hidden" name="message" value={composedMessage} />

          <div className="contact-submit contact-reveal">
            <p role="status" aria-live="polite" className="text-sm">
              {status === "sent" && <span className="text-accent">Message sent. Thanks, I'll get back to you soon.</span>}
              {status === "error" && (
                <span className="text-rose-400">The message couldn't be sent. Email me directly at {contactInfo.email}.</span>
              )}
            </p>
            <Magnetic strength={0.4}>
              <button type="submit" className="round-button round-button-accent" disabled={status === "sending"}>
                <span>{status === "sending" ? "Sending…" : "Send"}</span>
                <ArrowUpRightIcon className="size-6" />
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
