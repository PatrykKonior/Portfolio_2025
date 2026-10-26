import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import fontUrl from "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff?url";

import { scrollState } from "../../lib/smoothScroll.js";
import { heroState } from "./heroState.js";

const { damp } = THREE.MathUtils;
const BACKGROUND = "#eeece7";
const INK = "#111111";

const glassProps = (quality) => ({
    backside: true,
    backsideThickness: 0.3,
    samples: quality.samples,
    resolution: quality.resolution,
    thickness: 0.55,
    roughness: 0.02,
    ior: 1.45,
    chromaticAberration: 0.9,
    anisotropy: 0.25,
    distortion: 0.35,
    distortionScale: 0.4,
    temporalDistortion: 0.12,
    clearcoat: 1,
    attenuationDistance: 2.5,
    attenuationColor: "#ffffff",
    color: "#ffffff",
    background: new THREE.Color(BACKGROUND),
});

// The big lens: a glass torus that trails the pointer and bends the name behind it.
const Lens = ({ quality }) => {
    const mesh = useRef(null);
    const viewport = useThree((state) => state.viewport);

    useFrame((state, rawDelta) => {
        const delta = Math.min(rawDelta, 0.05);
        const { pointer, intro, progress } = heroState;
        const target = mesh.current;
        const auto = quality.autoPilot ? Math.sin(state.clock.elapsedTime * 0.5) * 0.6 : 0;

        target.position.x = damp(target.position.x, (quality.autoPilot ? auto : pointer.x) * viewport.width * 0.36, 3.2, delta);
        target.position.y = damp(target.position.y, (quality.autoPilot ? Math.cos(state.clock.elapsedTime * 0.4) * 0.4 : pointer.y) * viewport.height * 0.32 - progress * 2, 3.2, delta);

        const spin = 0.25 + Math.min(Math.abs(scrollState.velocity) * 0.02, 2);
        target.rotation.x += delta * spin * 0.6;
        target.rotation.y += delta * spin;

        const size = Math.min(viewport.width, viewport.height) * quality.lensScale * (0.001 + intro);
        target.scale.setScalar(damp(target.scale.x, size, 4, delta));
    });

    return (
        <mesh ref={mesh} position={[0, 0, 2]} scale={0.001}>
            <torusGeometry args={[1, 0.42, 64, 160]} />
            <MeshTransmissionMaterial {...glassProps(quality)} />
        </mesh>
    );
};

// Smaller crystals parked around the name; they drift apart as the hero scrolls away.
const shards = [
    { geometry: "ico", position: [-0.78, 0.55, 1], scale: 0.55, speed: 1.4 },
    { geometry: "capsule", position: [0.82, -0.6, 1.2], scale: 0.42, speed: 1.1 },
    { geometry: "sphere", position: [0.62, 0.68, 0.6], scale: 0.3, speed: 1.8 },
    { geometry: "box", position: [-0.6, -0.7, 1.4], scale: 0.36, speed: 1.2 },
];

const ShardGeometry = ({ type }) => {
    if (type === "ico") return <icosahedronGeometry args={[1, 0]} />;
    if (type === "capsule") return <capsuleGeometry args={[0.55, 1, 16, 32]} />;
    if (type === "sphere") return <sphereGeometry args={[1, 64, 64]} />;
    return <boxGeometry args={[1.3, 1.3, 1.3]} />;
};

const Shard = ({ shard, quality, index }) => {
    const group = useRef(null);
    const viewport = useThree((state) => state.viewport);

    useFrame((_, rawDelta) => {
        const delta = Math.min(rawDelta, 0.05);
        const { intro, progress } = heroState;
        const [x, y, z] = shard.position;
        const spread = 1 + progress * 0.8;
        const target = group.current;
        target.position.x = damp(target.position.x, x * viewport.width * 0.5 * spread, 3, delta);
        target.position.y = damp(target.position.y, y * viewport.height * 0.5 * spread + progress * (index % 2 ? 1.5 : -1), 3, delta);
        target.position.z = z;
        const size = shard.scale * Math.min(viewport.width, viewport.height) * 0.18 * intro;
        target.scale.setScalar(damp(target.scale.x, Math.max(size, 0.001), 3, delta));
    });

    return (
        <group ref={group} scale={0.001}>
            <Float speed={shard.speed} rotationIntensity={1.4} floatIntensity={1.2}>
                <mesh rotation={[index, index * 0.7, 0]}>
                    <ShardGeometry type={shard.geometry} />
                    <MeshTransmissionMaterial {...glassProps(quality)} samples={quality.shardSamples} resolution={quality.shardResolution} />
                </mesh>
            </Float>
        </group>
    );
};

const Name = () => {
    const group = useRef(null);
    const viewport = useThree((state) => state.viewport);
    const fontSize = Math.min(viewport.width / 4.6, viewport.height / 3.3);

    useFrame((_, rawDelta) => {
        const delta = Math.min(rawDelta, 0.05);
        const { intro, progress } = heroState;
        group.current.position.y = damp(group.current.position.y, progress * 1.4 + (1 - intro) * -0.6, 4, delta);
        const scale = 1 - progress * 0.12;
        group.current.scale.setScalar(damp(group.current.scale.x, scale, 4, delta));
    });

    return (
        <group ref={group}>
            <Text font={fontUrl} fontSize={fontSize} letterSpacing={-0.06} lineHeight={0.82} anchorX="center" anchorY="middle" color={INK} position={[0, fontSize * 0.42, 0]}>
                PATRYK
            </Text>
            <Text font={fontUrl} fontSize={fontSize} letterSpacing={-0.06} lineHeight={0.82} anchorX="center" anchorY="middle" color={INK} position={[0, -fontSize * 0.42, 0]}>
                KONIOR
            </Text>
        </group>
    );
};

const GlassScene = ({ active = true }) => {
    const quality = useMemo(() => {
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const base = { autoPilot: !finePointer, lensScale: desktop ? 0.2 : 0.15 };
        // Automated browsers usually render without a GPU; keep them responsive.
        if (navigator.webdriver) return { ...base, samples: 2, resolution: 256, shardSamples: 1, shardResolution: 128, shards: shards.length, dpr: 1 };
        return desktop
            ? { ...base, samples: 6, resolution: 768, shardSamples: 4, shardResolution: 256, shards: shards.length, dpr: 1.75 }
            : { ...base, samples: 3, resolution: 384, shardSamples: 2, shardResolution: 192, shards: 2, dpr: 1.25 };
    }, []);

    useEffect(() => {
        const handlePointer = (event) => {
            heroState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            heroState.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("pointermove", handlePointer, { passive: true });
        return () => window.removeEventListener("pointermove", handlePointer);
    }, []);

    return (
        <Canvas frameloop={active ? "always" : "never"} dpr={[1, quality.dpr]} camera={{ position: [0, 0, 10], fov: 30 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
            <color attach="background" args={[BACKGROUND]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 6]} intensity={1.5} />

            <Name />
            <Lens quality={quality} />
            {shards.slice(0, quality.shards).map((shard, index) => (
                <Shard key={shard.geometry} shard={shard} quality={quality} index={index} />
            ))}

            {/* Procedural studio lighting, so nothing is downloaded for reflections. */}
            <Environment resolution={256} frames={1}>
                <Lightformer form="rect" intensity={4} position={[0, 5, -6]} scale={[12, 2, 1]} />
                <Lightformer form="rect" intensity={2.5} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} />
                <Lightformer form="rect" intensity={2.5} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} />
                <Lightformer form="ring" color="#9db4ff" intensity={3} position={[2, 2, 6]} scale={3} />
                <Lightformer form="ring" color="#ffc3e6" intensity={2} position={[-3, -2, 6]} scale={2.5} />
            </Environment>
        </Canvas>
    );
};

export default GlassScene;
