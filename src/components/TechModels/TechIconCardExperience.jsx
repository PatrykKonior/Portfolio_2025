import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import useInView from "../../hooks/useInView.js";

const TechIconModel = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
  }, [scene, model.name]);

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={model.scale} rotation={model.rotation}>
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

const TechIconCardExperience = ({ model }) => {
  const wrapperRef = useRef(null);
  const isNear = useInView(wrapperRef, { rootMargin: "300px", once: true });
  const isVisible = useInView(wrapperRef);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      {isNear && (
        <Canvas dpr={[1, 1.5]} frameloop={isVisible ? "always" : "never"}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            penumbra={1}
            intensity={2}
          />
          <Suspense fallback={null}>
            <Environment preset="city" resolution={64} />
            <TechIconModel model={model} />
          </Suspense>

          <OrbitControls enableZoom={false} />
        </Canvas>
      )}
    </div>
  );
};

export default TechIconCardExperience;
