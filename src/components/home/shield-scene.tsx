import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function makeShieldShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-2.05, 1.65);
  shape.bezierCurveTo(-1.2, 2.05, 1.2, 2.05, 2.05, 1.65);
  shape.lineTo(1.86, -0.25);
  shape.bezierCurveTo(1.72, -1.8, 0.62, -2.65, 0, -2.98);
  shape.bezierCurveTo(-0.62, -2.65, -1.72, -1.8, -1.86, -0.25);
  shape.closePath();

  const hole = new THREE.Path();
  hole.moveTo(-1.58, 1.34);
  hole.bezierCurveTo(-0.92, 1.62, 0.92, 1.62, 1.58, 1.34);
  hole.lineTo(1.43, -0.2);
  hole.bezierCurveTo(1.31, -1.4, 0.52, -2.08, 0, -2.4);
  hole.bezierCurveTo(-0.52, -2.08, -1.31, -1.4, -1.43, -0.2);
  hole.closePath();
  shape.holes.push(hole);
  return shape;
}

function makeStarShape() {
  const shape = new THREE.Shape();
  const outer = 0.36;
  const inner = 0.15;
  for (let i = 0; i < 10; i += 1) {
    const angle = Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? outer : inner;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function Shield({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const shield = useMemo(makeShieldShape, []);
  const star = useMemo(makeStarShape, []);
  const { pointer } = useThree();
  const portal = THREE.MathUtils.smoothstep(progress, 0.2, 0.35);
  const closing = THREE.MathUtils.smoothstep(progress, 0.9, 1);
  const visible = Math.max(1 - portal, closing);

  useFrame(({ clock }, delta) => {
    const target = group.current;
    if (!target) return;
    const t = clock.getElapsedTime();
    target.rotation.y = THREE.MathUtils.damp(target.rotation.y, pointer.x * 0.22 + t * 0.08, 3, delta);
    target.rotation.x = THREE.MathUtils.damp(target.rotation.x, -pointer.y * 0.15 + Math.sin(t * 0.6) * 0.035, 3, delta);
    target.position.y = Math.sin(t * 0.7) * 0.08;
    const scale = (1 + portal * 3.8) * (0.78 + closing * 0.22);
    target.scale.setScalar(scale);
  });

  const geometry = { depth: 0.13, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.045, bevelThickness: 0.045 };
  return (
    <group ref={group} position={[0, -0.25, portal * 4.8]} visible={visible > 0.015}>
      <mesh>
        <extrudeGeometry args={[shield, geometry]} />
        <meshPhysicalMaterial color="#d5ad5a" metalness={0.96} roughness={0.16} clearcoat={0.7} transparent opacity={visible} />
      </mesh>
      <mesh position={[0, 2.58, 0]}>
        <extrudeGeometry args={[star, { ...geometry, depth: 0.1 }]} />
        <meshPhysicalMaterial color="#e4c16f" metalness={1} roughness={0.13} transparent opacity={visible} />
      </mesh>
    </group>
  );
}

export default function ShieldScene({ progress }: { progress: number }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.18} />
      <directionalLight position={[4, 5, 6]} intensity={2.1} color="#f2d38a" />
      <Shield progress={progress} />
      <Environment resolution={128}>
        <Lightformer intensity={5} color="#f0c56a" position={[0, 5, -3]} scale={[4, 1, 1]} />
        <Lightformer intensity={3} color="#ffffff" position={[-4, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[3, 1, 1]} />
        <Lightformer intensity={2} color="#8ca8cc" position={[4, -2, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 1, 1]} />
      </Environment>
    </Canvas>
  );
}
