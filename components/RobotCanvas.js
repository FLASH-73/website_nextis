"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Center, Loader, useGLTF } from "@react-three/drei";
import { Suspense, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";

import { useLanguage } from "@/contexts/LanguageContext";
import { SkeletonUtils } from "three-stdlib";

function Model() {
  const { scene } = useGLTF("/models/con_one.glb");

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

useGLTF.preload("/models/con_one.glb");

export default function RobotCanvas({ onClose }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="absolute top-8 right-8 z-50">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all"
        >
          {t.robot.close}
        </button>
      </div>

      <div className="absolute right-0 w-2/3 h-full">
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

      <div className="absolute top-1/3 left-1/3 -translate-y-1/2 z-40 pointer-events-none">
        <div className="space-y-6 md:space-y-10 text-gray-900">
          <div>
            <h3 className="uppercase tracking-widest text-gray-500 mb-2" style={{ fontSize: 'clamp(0.75rem, 0.4vw, 1rem)' }}>{t.robot.dof}</h3>
            <p className="font-light" style={{ fontSize: 'clamp(1.5rem, 1.3vw, 3rem)' }}>7 DoF</p>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-gray-500 mb-2" style={{ fontSize: 'clamp(0.75rem, 0.4vw, 1rem)' }}>{t.robot.payload}</h3>
            <div className="flex gap-10">
              <div>
                <p className="font-light" style={{ fontSize: 'clamp(1.25rem, 1vw, 2.25rem)' }}>6 kg</p>
                <span className="text-gray-500" style={{ fontSize: 'clamp(0.75rem, 0.4vw, 0.875rem)' }}>{t.robot.peak}</span>
              </div>
              <div>
                <p className="font-light" style={{ fontSize: 'clamp(1.25rem, 1vw, 2.25rem)' }}>3 kg</p>
                <span className="text-gray-500" style={{ fontSize: 'clamp(0.75rem, 0.4vw, 0.875rem)' }}>{t.robot.rated}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-gray-500 mb-2" style={{ fontSize: 'clamp(0.75rem, 0.4vw, 1rem)' }}>{t.robot.reach}</h3>
            <p className="font-light" style={{ fontSize: 'clamp(1.25rem, 1vw, 2.25rem)' }}>700 mm</p>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-gray-500 mb-2" style={{ fontSize: 'clamp(0.75rem, 0.4vw, 1rem)' }}>{t.robot.gripper}</h3>
            <p className="font-light mb-1" style={{ fontSize: 'clamp(1rem, 0.8vw, 1.5rem)' }}>{t.robot.gripperType}</p>
            <p className="text-gray-600" style={{ fontSize: 'clamp(0.75rem, 0.4vw, 1rem)' }}>{t.robot.gripperDetails}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 text-center pointer-events-none w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nextis Arm One</h2>
        <p className="text-gray-600">{t.robot.controls}</p>
      </div>
    </div>
  );
}
