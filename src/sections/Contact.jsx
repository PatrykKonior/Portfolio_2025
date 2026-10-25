import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { contactInfo } from "../constants";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  GlobeIcon,
  LinkedInIcon,
  MailIcon,
  PinIcon,
} from "../components/Icons";

gsap.registerPlugin(ScrollTrigger);

const ContactLink = ({ href, icon, label, value }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="contact-link group">
    <span className="contact-link-icon">{icon}</span>
    <span className="flex flex-col min-w-0">
      <span className="text-xs uppercase tracking-widest text-blue-50">{label}</span>
      <span className="truncate">{value}</span>
    </span>
    <ArrowUpRightIcon className="size-5 ms-auto text-blue-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
  </a>
);

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useGSAP(() => {
    gsap.from(".contact-reveal", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
      },
    });
  }, []);

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
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <div className="contact-panel">
          <div className="xl:col-span-5 flex flex-col gap-8">
            <div className="contact-reveal availability">
              <span className="availability-dot" />
              Open to new projects and full-time roles
            </div>

            <div className="contact-reveal flex flex-col gap-4">
              <h2 className="font-semibold md:text-5xl text-3xl leading-tight">
                Have a project or a role in mind?
              </h2>
              <p className="text-white-50 md:text-lg">
                Tell me what you're building and I'll reply by email. You can also reach me directly:
              </p>
            </div>

            <div className="contact-reveal flex flex-col gap-3">
              <div className="contact-link">
                <span className="contact-link-icon"><MailIcon /></span>
                <a href={`mailto:${contactInfo.email}`} className="flex flex-col min-w-0">
                  <span className="text-xs uppercase tracking-widest text-blue-50">Email</span>
                  <span className="truncate">{contactInfo.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="copy-button"
                  aria-label="Copy email address"
                >
                  {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <ContactLink href={contactInfo.linkedin} icon={<LinkedInIcon />} label="LinkedIn" value="in/patrykkonior" />
              <ContactLink href={contactInfo.github} icon={<GitHubIcon />} label="GitHub" value="PatrykKonior" />
            </div>

            <div className="contact-reveal flex flex-wrap gap-x-6 gap-y-2 text-white-50 text-sm">
              <span className="flex items-center gap-2"><PinIcon className="size-4" />{contactInfo.location} · {contactInfo.workMode}</span>
              <span className="flex items-center gap-2"><GlobeIcon className="size-4" />{contactInfo.languages}</span>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-reveal contact-form xl:col-span-7"
          >
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name or company"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or role"
                rows="6"
                className="flex-1"
                required
              />
            </div>

            <button type="submit" className="send-button group" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send message"}
              <ArrowUpRightIcon className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            <p role="status" aria-live="polite" className="text-sm min-h-5">
              {status === "sent" && (
                <span className="text-emerald-400">Message sent. Thanks, I'll get back to you soon.</span>
              )}
              {status === "error" && (
                <span className="text-rose-400">
                  The message couldn't be sent. Email me directly at {contactInfo.email}.
                </span>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
