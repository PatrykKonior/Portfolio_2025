import { contactInfo, navLinks } from "../constants";
import { ArrowUpIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../components/Icons";

const socials = [
  { name: "LinkedIn", url: contactInfo.linkedin, icon: <LinkedInIcon /> },
  { name: "GitHub", url: contactInfo.github, icon: <GitHubIcon /> },
  { name: "Email", url: `mailto:${contactInfo.email}`, icon: <MailIcon /> },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-line" />

      <div className="footer-main">
        <div className="flex flex-col gap-1 md:items-start items-center">
          <a href="#hero" className="text-xl font-semibold">Patryk Konior</a>
          <p className="text-white-50 text-sm">Full-stack Developer · {contactInfo.location}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[...navLinks, { name: "Contact", link: "#contact" }].map(({ name, link }) => (
              <li key={name}>
                <a href={link} className="footer-nav-link">{name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-3 md:justify-end justify-center">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={social.name}
              className="footer-social"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Patryk Konior. All rights reserved.</p>
        <a href="#hero" className="flex items-center gap-2 hover:text-white transition-colors">
          Back to top <ArrowUpIcon className="size-4" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
