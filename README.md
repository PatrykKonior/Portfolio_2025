# Patryk Konior — Portfolio

Personal portfolio and client site. React 19 + Vite, with a WebGL scene in React Three Fiber and scroll choreography in GSAP.

## Highlights

- Liquid-glass hero: the name is rendered in WebGL and refracted by glass shapes (drei `MeshTransmissionMaterial` with chromatic aberration); the main lens follows the pointer (`src/components/Hero`).
- Floating glass dock navigation with a sliding indicator.
- Typographic project index with a pointer-following preview and a case-study drawer.
- Bento grid with tilt, spotlight, a live clock and an orbiting toolbox.
- Sticky odometer year for the experience timeline, proximity-reactive variable type in Contact.
- Lenis smooth scrolling synced with GSAP ScrollTrigger; everything falls back gracefully with `prefers-reduced-motion`.
- Three.js loads in its own chunk and stops rendering once the hero is off screen.

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint
```

The contact form uses EmailJS. Copy `.env.example` to `.env` and fill in the `VITE_APP_EMAILJS_*` keys.

Content (projects, services, experience, copy) lives in `src/constants/index.js`.
