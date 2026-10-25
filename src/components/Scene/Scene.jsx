import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

import { blobFragment, blobVertex } from "./shaders.js";
import { sceneState } from "../../lib/sceneState.js";
import { gsap, useGSAP } from "../../lib/motion.js";

const { damp } = THREE.MathUtils;

const Blob = ({ detail }) => {
    const mesh = useRef(null);
    const viewport = useThree((state) => state.viewport);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uDistort: { value: 0.3 },
        uFrequency: { value: 1.05 },
        uAccent: { value: 0 },
        uAccentColor: { value: new THREE.Color("#d4ff3a") },
    }), []);

    useFrame((_, rawDelta) => {
        const delta = Math.min(rawDelta, 0.05);
        const { blob, pointer, velocity, intro } = sceneState;
        const speed = Math.min(Math.abs(velocity) * 0.02, 1.4);

        uniforms.uTime.value += delta * (0.4 + speed);
        uniforms.uDistort.value = damp(uniforms.uDistort.value, blob.distort + speed * 0.18, 4, delta);
        uniforms.uAccent.value = damp(uniforms.uAccent.value, blob.accent, 3, delta);

        const target = mesh.current;
        target.position.x = damp(target.position.x, blob.x * viewport.width * 0.5 + pointer.x * 0.25, 2.5, delta);
        target.position.y = damp(target.position.y, blob.y * viewport.height * 0.5 + pointer.y * 0.2, 2.5, delta);

        const fit = Math.min(viewport.width, viewport.height) * 0.26;
        const scale = blob.scale * fit * (0.2 + 0.8 * intro);
        target.scale.setScalar(damp(target.scale.x, scale, 3, delta));

        target.rotation.y += delta * 0.12;
        target.rotation.x = damp(target.rotation.x, -pointer.y * 0.5, 2, delta);
        target.rotation.z = damp(target.rotation.z, pointer.x * 0.3, 2, delta);
    });

    return (
        <mesh ref={mesh} scale={0.01}>
            <icosahedronGeometry args={[1, detail]} />
            <shaderMaterial vertexShader={blobVertex} fragmentShader={blobFragment} uniforms={uniforms} />
        </mesh>
    );
};

const Dust = ({ count }) => {
    const points = useRef(null);

    const positions = useMemo(() => {
        const array = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 4 + Math.random() * 8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            array[i * 3 + 2] = radius * Math.cos(phi) - 4;
        }
        return array;
    }, [count]);

    useFrame((_, delta) => {
        const drift = 0.015 + Math.min(Math.abs(sceneState.velocity) * 0.003, 0.25);
        points.current.rotation.y += delta * drift;
        points.current.rotation.x = damp(points.current.rotation.x, sceneState.pointer.y * 0.08, 2, delta);
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#ecebe6" size={0.018} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
        </points>
    );
};

// Where the blob sits for each section, in fractions of the half-viewport.
const stages = {
    desktop: [
        [null, { x: 0.5, y: -0.02, scale: 1, distort: 0.22, accent: 0 }],
        ["#about", { x: 0.62, y: -0.4, scale: 0.7, distort: 0.38, accent: 0.35 }],
        ["#work", { x: 0.72, y: 0.58, scale: 0.32, distort: 0.18, accent: 1 }],
        ["#services", { x: -0.66, y: -0.1, scale: 0.8, distort: 0.45, accent: 0.2 }],
        ["#experience", { x: 0.74, y: -0.45, scale: 0.45, distort: 0.3, accent: 0.6 }],
        ["#contact", { x: 0.55, y: 0.05, scale: 1, distort: 0.32, accent: 1 }],
        [".footer", { x: 0, y: -0.45, scale: 0.75, distort: 0.28, accent: 0.5 }],
    ],
    mobile: [
        [null, { x: 0.25, y: 0.35, scale: 0.85, distort: 0.22, accent: 0 }],
        ["#about", { x: 0.45, y: -0.5, scale: 0.6, distort: 0.35, accent: 0.35 }],
        ["#work", { x: 0.55, y: 0.6, scale: 0.35, distort: 0.18, accent: 1 }],
        ["#services", { x: -0.5, y: -0.45, scale: 0.6, distort: 0.4, accent: 0.2 }],
        ["#experience", { x: 0.5, y: 0.55, scale: 0.45, distort: 0.3, accent: 0.6 }],
        ["#contact", { x: 0.35, y: -0.45, scale: 0.75, distort: 0.32, accent: 1 }],
        [".footer", { x: 0, y: -0.5, scale: 0.6, distort: 0.28, accent: 0.5 }],
    ],
};

const Scene = () => {
    const isDesktop = useMemo(() => window.matchMedia("(min-width: 1024px)").matches, []);

    useEffect(() => {
        const handlePointer = (event) => {
            sceneState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            sceneState.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("pointermove", handlePointer, { passive: true });
        return () => window.removeEventListener("pointermove", handlePointer);
    }, []);

    // Created after the sections mount, so the pinned Work section is already measured.
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, ({ conditions }) => {
            const list = conditions.desktop ? stages.desktop : stages.mobile;
            gsap.set(sceneState.blob, list[0][1]);
            list.slice(1).forEach(([selector, to], index) => {
                gsap.fromTo(sceneState.blob, { ...list[index][1] }, {
                    ...to,
                    ease: "none",
                    immediateRender: false,
                    scrollTrigger: { trigger: selector, start: "top bottom", end: "top 20%", scrub: true },
                });
            });
        });
    });

    return (
        <div className="scene" aria-hidden="true">
            <Canvas
                dpr={[1, isDesktop ? 1.75 : 1.25]}
                camera={{ position: [0, 0, 6], fov: 35 }}
                gl={{ antialias: true, powerPreference: "high-performance" }}
            >
                <Blob detail={isDesktop ? 96 : 40} />
                <Dust count={isDesktop ? 1400 : 500} />
                {isDesktop && (
                    <EffectComposer multisampling={0}>
                        <Bloom intensity={0.55} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
};

export default Scene;
