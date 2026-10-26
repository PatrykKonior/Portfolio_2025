// Shared between the DOM (GSAP, pointer) and the WebGL hero; written every frame, so not React state.
export const heroState = {
    pointer: { x: 0.25, y: 0.1 },
    intro: 0,
    progress: 0,
};
