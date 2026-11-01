# Patryk Konior — Portfolio

Personal portfolio and client site. React 19 + Vite, with a WebGL scene in React Three Fiber and scroll choreography in GSAP.

## Highlights

- One fixed WebGL scene: a custom-shader iridescent blob and a dust field that move, morph and recolour per section (`src/components/Scene`).
- Lenis smooth scrolling synced with GSAP ScrollTrigger (`src/lib/smoothScroll.js`).
- Preloader, SplitText headline reveals, scroll-lit About copy, a pinned horizontal Work gallery, stacking Services cards, an Experience accordion and a velocity-reactive tech marquee.
- Custom cursor, magnetic buttons, film grain; everything falls back gracefully with `prefers-reduced-motion`.
- Three.js loads in its own chunk so the page paints first.

## Two audiences, one site

A switch in the hero changes who the page is for, reordering the sections and adapting the copy, CTAs, navigation and contact form:

- `/?for=clients` (default): services, how a B2B project runs, work, experience. The form asks for project type and budget.
- `/?for=hiring`: a recruiter snapshot with a CV button, experience, work. The form asks for company and type of engagement.

Send the matching link with offers or applications. To offer a CV download, drop the PDF in `public/` and set `cvUrl` in `src/constants/index.js`; until then the button opens an email.

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint
```

The contact form uses EmailJS. Copy `.env.example` to `.env` and fill in the `VITE_APP_EMAILJS_*` keys.

Content (projects, services, experience, copy) lives in `src/constants/index.js`.
