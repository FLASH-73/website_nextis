"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Center, Loader, useGLTF } from "@react-three/drei";
import { Suspense, useLayoutEffect, useMemo, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

import { useLanguage } from "@/contexts/LanguageContext";
import { SkeletonUtils } from "three-stdlib";

function Model() {
  const { scene } = useGLTF("/models/con_one_compressed.glb");

  // Clone the scene to avoid mutating the global cache
  // We use useMemo to only clone when the base scene changes
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useLayoutEffect(() => {
    const createdMaterials = [];

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // The GLB likely has PBR materials already, but we want to enforce our specific look
        // especially for the "Aluminum" vs "Plastic" distinction.

        const oldMat = child.material;
        const mat = Array.isArray(oldMat) ? oldMat[0] : oldMat;

        // Clone to avoid sharing issues if multiple meshes use the same material instance
        // and we want to modify them differently based on heuristics (though here it's per-mesh)
        const newMat = mat.clone();

        // Heuristic: Check brightness to distinguish Aluminum vs Black parts
        const color = newMat.color;
        const brightness = (color.r + color.g + color.b) / 3;

        if (brightness > 0.5) {
          // Aluminum settings
          newMat.metalness = 0.9;
          newMat.roughness = 0.3;
          newMat.envMapIntensity = 1.0;
        } else {
          // Black plastic/rubber settings
          newMat.metalness = 0.2;
          newMat.roughness = 0.7;
          newMat.envMapIntensity = 0.5;
        }

        child.material = newMat;
        child.castShadow = true;
        child.receiveShadow = true;

        createdMaterials.push(newMat);
      }
    });

    // Cleanup: Dispose of the materials we created when the component unmounts
    return () => {
      createdMaterials.forEach(mat => mat.dispose());
    };
  }, [clonedScene]);

  // GLTF is usually Y-up, so we likely don't need the rotation anymore.
  return <primitive object={clonedScene} />;
}

useGLTF.preload("/models/con_one_compressed.glb");

export default function RobotCanvas({ onClose }) {
  const { t } = useLanguage();
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="3D Robot Viewer"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-start md:justify-center font-original overflow-y-auto md:overflow-hidden"
    >
      <div className="absolute top-8 right-8 z-50">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label={t.robot.close}
          className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all"
        >
          {t.robot.close}
        </button>
      </div>

      <div
        role="img"
        aria-label="Interactive 3D model of the Nextis Constructor One robotic arm"
        className="relative w-full h-[50vh] order-2 md:order-none md:absolute md:right-0 md:w-2/3 md:h-full md:top-0"
      >
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} adjustCamera={1.5}>
              <Center disableX disableZ>
                <Model />
              </Center>
            </Stage>
          </Suspense>
          <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      <Loader />

      <div className="relative w-full px-8 pt-24 pb-4 order-1 md:order-none md:absolute md:top-1/3 md:left-1/3 md:-translate-y-1/2 md:p-0 md:w-auto z-40 pointer-events-none">
        <div className="space-y-6 md:space-y-10 text-gray-900 text-center">
          <div>
            <h3 className="uppercase tracking-widest text-gray-500 mb-2" style={{ fontSize: 'var(--text-label)' }}>{t.robot.dof}</h3>
            <p className="font-light" style={{ fontSize: 'var(--text-body)' }}>7 DoF</p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="uppercase tracking-widest text-gray-500 mb-2" style={{ fontSize: 'var(--text-label)' }}>{t.robot.payload}</h3>
            <div className="flex gap-10">
              <div className="text-center">
                <p className="font-light" style={{ fontSize: 'var(--text-body)' }}>6 kg</p>
                <span className="text-gray-500" style={{ fontSize: 'var(--text-label)' }}>{t.robot.peak}</span>
              </div>
              <div className="text-center">
                <p className="font-light" style={{ fontSize: 'var(--text-body)' }}>3 kg</p>
                <span className="text-gray-500" style={{ fontSize: 'var(--text-label)' }}>{t.robot.rated}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-gray-500 mb-2" style={{ fontSize: 'var(--text-label)' }}>{t.robot.reach}</h3>
            <p className="font-light" style={{ fontSize: 'var(--text-body)' }}>700 mm</p>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-gray-500 mb-2" style={{ fontSize: 'var(--text-label)' }}>{t.robot.gripper}</h3>
            <p className="font-light mb-1" style={{ fontSize: 'var(--text-body)' }}>{t.robot.gripperType}</p>
            <p className="text-gray-600" style={{ fontSize: 'var(--text-label)' }}>{t.robot.gripperDetails}</p>
          </div>
        </div>
      </div>

      <div className="relative pb-12 order-3 md:order-none md:absolute md:bottom-12 md:pb-0 text-center pointer-events-none w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nextis Constructor One</h2>
        <p className="text-gray-600">{t.robot.controls}</p>
      </div>
    </div>
  );
}
