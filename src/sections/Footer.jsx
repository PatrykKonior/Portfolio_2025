import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "../lib/motion.js";
import { contactInfo } from "../constants";

const socials = [
  { name: "LinkedIn", url: contactInfo.linkedin },
  { name: "GitHub", url: contactInfo.github },
  { name: "Email", url: `mailto:${contactInfo.email}` },
];

const ticker = ["Available for freelance", "Open to full-time roles", "Based in Chorzów", "Working worldwide"];

const Footer = () => {
  const ref = useRef(null);

  useGSAP(() => {
    if (!motionOK()) return;
    gsap.to(".ticker-track", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    gsap.from(".footer-inner", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true },
    });
  }, { scope: ref });

  return (
    <footer ref={ref} className="footer">
      <div className="footer-inner">
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="ticker-group">
                {ticker.map((item) => <span key={item}>{item}<span className="ticker-dot">●</span></span>)}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-grid container">
          <p className="footer-note">
            Thanks for scrolling.<br />
            <span className="text-muted-dark">Now let's make something worth scrolling for.</span>
          </p>
          <ul className="footer-socials">
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.url} target={social.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {social.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom container mono">
          <span>© {new Date().getFullYear()} Patryk Konior</span>
          <span>React · Three.js · GSAP</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
