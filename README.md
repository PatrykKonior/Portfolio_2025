# Patryk Konior — Portfolio

Personal portfolio and client site. React 19 + Vite, with a WebGL scene in React Three Fiber and scroll choreography in GSAP.

## Highlights

- One fixed WebGL scene: a custom-shader iridescent blob and a dust field that move, morph and recolour per section (`src/components/Scene`).
- Lenis smooth scrolling synced with GSAP ScrollTrigger (`src/lib/smoothScroll.js`).
- Preloader, SplitText headline reveals, scroll-lit About copy, a pinned horizontal Work gallery, stacking Services cards, an Experience accordion and a velocity-reactive tech marquee.
- Custom cursor, magnetic buttons, film grain; everything falls back gracefully with `prefers-reduced-motion`.
- Three.js loads in its own chunk so the page paints first.

## Configuration

- **`site.config.js`**: the two settings to fill in when the site goes live.
  - `url`: the domain, e.g. `"https://patrykkonior.dev"`. Turns on the canonical and hreflang tags, absolute social-preview URLs and `sitemap.xml`.
  - `gaMeasurementId`: a Google Analytics 4 ID. Turns on the cookie banner (vanilla-cookieconsent, Consent Mode v2); GA only loads after consent. Empty means no analytics and no banner.
- **CV**: drop `Patryk-Konior-CV-EN.pdf` and/or `Patryk-Konior-CV-PL.pdf` into `public/`. The "Download CV" buttons appear automatically for the language whose file exists.
- **Copy**: every text on the site lives in `src/i18n/en.js` and `src/i18n/pl.js`; data that doesn't change with the language (links, stack, icons) is in `src/constants/index.js`.

## Languages

EN/PL switch in the navbar, with a curtain transition and scramble-decoded labels. The language comes from `?lang=en|pl`, then the visitor's last choice, then the browser language.

## 3D fallback

The WebGL blob steps down only when a device clearly struggles: below ~25 fps it renders a lighter scene, and below ~20 fps (or without WebGL) it swaps to a pre-rendered image that follows the same scroll path. `?lite` forces the image, `?full` skips the checks. With reduced motion the blob stops morphing.

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint
```

The contact form uses EmailJS. Copy `.env.example` to `.env` and fill in the `VITE_APP_EMAILJS_*` keys.

Content (projects, services, experience, copy) lives in `src/constants/index.js`.
