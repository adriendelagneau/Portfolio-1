import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import useExperienceUIStore from "@/store/useExperienceUIStore";

import GridPlanes from "./components/GridPlanes";
import HitBoxes from "./components/models/Hit-boxes";
import Room_1 from "./components/models/Room-1";
import Room_2 from "./components/models/Room-2";
import Room_3 from "./components/models/Room-3";
import Room_4 from "./components/models/Room-4";

const Scene = ({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const rotationX = useRef(0);
  const rotationY = useRef(0);

  const gridPlanesRef = useRef(null);

  // ✅ NEW: check if experience started
  const experienceStarted = useExperienceUIStore((s) => s.experienceStarted);

  // Animate scene rotation based on pointer position — ONLY if experience has begun
  useFrame(() => {
    if (!groupRef.current) return;
    if (!experienceStarted) return; // 🔥 stop animations before start

    const targetX = pointer.current.y * Math.PI * 0.01;
    const targetY = pointer.current.x * Math.PI * 0.02;

    rotationX.current = THREE.MathUtils.lerp(rotationX.current, targetX, 0.1);
    rotationY.current = THREE.MathUtils.lerp(rotationY.current, targetY, 0.1);

    groupRef.current.rotation.x = rotationX.current;
    groupRef.current.rotation.y = rotationY.current;
  });

  return (
    <Suspense fallback={null}>
      <group
        rotation={[Math.PI / 14, 0, 0]}
        position={[0, -4.6, 0]}
        scale={1.7}
      >
        <group ref={groupRef}>
          {/* GridPlanes only active once experience started */}
          <GridPlanes
            ref={gridPlanesRef}
            position={[-1, -2, -15]}
            rows={22}
            columns={22}
            planeWidth={2.5}
            planeDepth={2.5}
          />
          {/* Hit-Boxes */}
          <HitBoxes />

          {/* Rooms always render */}
          <Room_1 />
          <Room_2 />
          <Room_3 />
          <Room_4 />
        </group>
      </group>
    </Suspense>
  );
};

export default Scene;
