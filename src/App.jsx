import { lazy, Suspense, useState } from "react";

import Preloader from "./components/Preloader.jsx";
import Cursor from "./components/Cursor.jsx";
import NavBar from "./components/NavBar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Work from "./sections/Work.jsx";
import Services from "./sections/Services.jsx";
import Experience from "./sections/Experience.jsx";
import Stack from "./sections/Stack.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import { useSmoothScroll } from "./lib/smoothScroll.js";

// three.js and post-processing ship in their own chunk so the page paints first.
const Scene = lazy(() => import("./components/Scene/Scene.jsx"));

const App = () => {
    const [ready, setReady] = useState(false);
    useSmoothScroll(ready);

    return (
        <>
            <Preloader onComplete={() => setReady(true)} />
            <Cursor />
            <div className="grain" aria-hidden="true" />
            <NavBar ready={ready} />
            <main>
                <Hero ready={ready} />
                <About />
                <Work />
                <Services />
                <Experience />
                <Stack />
                <Contact />
            </main>
            <Footer />
            {/* Rendered last so its scroll choreography is set up after the sections' pins. */}
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </>
    );
};

export default App;
