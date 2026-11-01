import { Fragment, lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";

import Preloader from "./components/Preloader.jsx";
import Cursor from "./components/Cursor.jsx";
import NavBar from "./components/NavBar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Snapshot from "./sections/Snapshot.jsx";
import Work from "./sections/Work.jsx";
import Services from "./sections/Services.jsx";
import Process from "./sections/Process.jsx";
import Experience from "./sections/Experience.jsx";
import Stack from "./sections/Stack.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import { useSmoothScroll } from "./lib/smoothScroll.js";
import { ScrollTrigger } from "./lib/motion.js";
import { AudienceContext, initialAudience, persistAudience } from "./lib/audience.js";

// three.js and post-processing ship in their own chunk so the page paints first.
const Scene = lazy(() => import("./components/Scene/Scene.jsx"));

// Clients see what I offer and how we'd work first; recruiters see the facts and my track record.
const sectionOrder = {
    clients: [["about", About], ["services", Services], ["process", Process], ["work", Work], ["experience", Experience], ["stack", Stack], ["contact", Contact]],
    hiring: [["snapshot", Snapshot], ["experience", Experience], ["work", Work], ["about", About], ["stack", Stack], ["contact", Contact]],
};

const App = () => {
    const [ready, setReady] = useState(false);
    const [audience, setAudienceState] = useState(initialAudience);
    useSmoothScroll(ready);

    const setAudience = useCallback((next) => {
        setAudienceState(next);
        persistAudience(next);
    }, []);

    const context = useMemo(() => ({ audience, setAudience }), [audience, setAudience]);

    // The sections below the hero remount on every switch; re-measure once they and the scene have set up.
    useEffect(() => {
        ScrollTrigger.refresh();
    }, [audience]);

    return (
        <AudienceContext.Provider value={context}>
            <Preloader onComplete={() => setReady(true)} />
            <Cursor />
            <div className="grain" aria-hidden="true" />
            <NavBar ready={ready} />
            <main>
                <Hero ready={ready} />
                {/* Keyed by audience so every section and its scroll triggers are rebuilt in the new order. */}
                <Fragment key={audience}>
                    {sectionOrder[audience].map(([id, component], index) => {
                        const Section = component;
                        return <Section key={id} index={String(index + 1).padStart(2, "0")} />;
                    })}
                </Fragment>
            </main>
            <Footer />
            {/* Rendered last so its scroll choreography is set up after the sections' pins. */}
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </AudienceContext.Provider>
    );
};

export default App;
