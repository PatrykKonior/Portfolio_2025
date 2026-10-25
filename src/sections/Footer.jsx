import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { contactInfo, navLinks } from "../constants";
import useLocalTime from "../hooks/useLocalTime.js";

const socials = [
  { name: "LinkedIn", url: contactInfo.linkedin },
  { name: "GitHub", url: contactInfo.github },
  { name: "Email", url: `mailto:${contactInfo.email}` },
];

const Footer = () => {
  const footerRef = useRef(null);
  const time = useLocalTime();

  useGSAP(() => {
    if (!motionOK()) return;
    gsap.from(".footer-giant span", {
      yPercent: 100,
      duration: 1.4,
      stagger: 0.04,
      scrollTrigger: { trigger: ".footer-giant", start: "top 95%" },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="footer container-x">
      <div className="footer-grid">
        <div>
          <p className="mono text-muted">Navigation</p>
          <ul>
            {[...navLinks, { name: "Contact", link: "#contact" }].map(({ name, link }) => (
              <li key={name}><a href={link} className="footer-link">{name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono text-muted">Socials</p>
          <ul>
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {social.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono text-muted">Local time</p>
          <p className="footer-time">{time} <span className="text-muted">CET</span></p>
        </div>
        <div className="md:text-right">
          <a href="#top" className="pill">Back to top ↑</a>
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">
        {"KONIOR".split("").map((char, index) => <span key={index}>{char}</span>)}
      </div>

      <div className="footer-bottom mono text-muted">
        <span>© {new Date().getFullYear()} Patryk Konior</span>
        <span>Built with React, Three.js & GSAP</span>
      </div>
    </footer>
  );
};

export default Footer;
