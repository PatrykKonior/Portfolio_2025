import { useEffect, useRef } from "react";
import { sceneState } from "../../lib/sceneState.js";

// Pre-rendered stand-in for the WebGL blob on devices without WebGL or too slow for it.
// It follows the same scroll stages and pointer as the real one, just as a flat image.
const StaticBlob = () => {
    const ref = useRef(null);

    useEffect(() => {
        const image = ref.current;
        const current = { x: 0, y: 0, size: 0 };
        let frame = 0;

        const render = () => {
            const { blob, pointer, intro } = sceneState;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const target = {
                x: blob.x * width * 0.5 + pointer.x * 30,
                y: -blob.y * height * 0.5 - pointer.y * 24,
                // Matches the WebGL blob's on-screen size, plus room for its glow.
                size: blob.scale * Math.min(width, height) * 0.26 * 2 * 1.45 * (0.2 + 0.8 * intro),
            };
            current.x += (target.x - current.x) * 0.08;
            current.y += (target.y - current.y) * 0.08;
            current.size += (target.size - current.size) * 0.08;
            image.style.width = `${current.size}px`;
            image.style.transform = `translate(-50%, -50%) translate(${current.x}px, ${current.y}px)`;
            frame = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div className="scene scene-static" aria-hidden="true">
            <img ref={ref} src="/images/blob.webp" alt="" className="static-blob" />
        </div>
    );
};

export default StaticBlob;
