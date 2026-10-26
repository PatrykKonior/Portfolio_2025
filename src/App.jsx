import { useState } from "react";

import Intro from "./components/Intro.jsx";
import Cursor from "./components/Cursor.jsx";
import Dock from "./components/Dock.jsx";
import Hero from "./sections/Hero.jsx";
import Statement from "./sections/Statement.jsx";
import Work from "./sections/Work.jsx";
import Bento from "./sections/Bento.jsx";
import Experience from "./sections/Experience.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import { useSmoothScroll } from "./lib/smoothScroll.js";

const App = () => {
    const [ready, setReady] = useState(false);
    useSmoothScroll(ready);

    return (
        <>
            <Intro onComplete={() => setReady(true)} />
            <Cursor />
            <div className="grid-lines" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => <span key={i} />)}
            </div>
            <main>
                <Hero ready={ready} />
                <Statement />
                <Work />
                <Bento />
                <Experience />
                <Contact />
            </main>
            <Footer />
            <Dock ready={ready} />
        </>
    );
};

export default App;
