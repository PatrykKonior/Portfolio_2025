import React, {Suspense, useRef} from 'react'
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import {Room} from "./Room.jsx";
import HeroLights from "./HeroLights.jsx";
import Particles from "./Particles.jsx";
import useInView from "../../hooks/useInView.js";

const HeroExperience = () => {
    const isTablet = useMediaQuery( {query: '(max-width: 1024px)'});
    const isMobile = useMediaQuery( {query: '(max-width: 768px)'});
    const wrapperRef = useRef(null);
    const isVisible = useInView(wrapperRef);

    return (
        <div ref={wrapperRef} className="w-full h-full">
            <Canvas
                dpr={[1, 1.5]}
                frameloop={isVisible ? "always" : "never"}
                camera={ {position: [0, 0, 15], fov: 45} }
            >
                <ambientLight intensity={0.2} color="#1a1a40" />

                <OrbitControls
                    enablePan={false}
                    enableZoom={!isTablet}
                    maxDistance={20}
                    minDistance={5}
                    minPolarAngle={Math.PI / 5}
                    maxPolarAngle={Math.PI / 2}
                />

                <Suspense fallback={null}>
                    <HeroLights />
                    <Particles count={100} />

                    <group
                        scale={isMobile ? 0.7 : 1}
                        position={[0, -3.5, 0]}
                        rotation={[0, -Math.PI / 4, 0]}
                    >
                        <Room />
                    </group>
                </Suspense>
            </Canvas>
        </div>
    )
}
export default HeroExperience
