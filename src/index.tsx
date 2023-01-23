import * as THREE from "three";
import { useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import React from "react";
import { OrbitControls } from "@react-three/drei";

function Jupiter(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const loader = new THREE.TextureLoader();

  const bump = loader.load("./dist/assets/jupiter-bump-min.jpg");
  const map = loader.load("./dist/assets/jupiter-map-min.jpg");
  const normal = loader.load("./dist/assets/jupiter-norm-min.jpg");

  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 5;
  });

  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={map} normalMap={normal} bumpMap={bump} />
    </mesh>
  );
}

function Sun(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const loader = new THREE.TextureLoader();

  const map = loader.load("./dist/assets/sun-map-min.jpg");

  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={map} />
    </mesh>
  );
}

function Io(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const loader = new THREE.TextureLoader();

  const bump = loader.load("./dist/assets/io-bump-min.jpg");
  const map = loader.load("./dist/assets/io-diff-min.jpg");
  const normal = loader.load("./dist/assets/io-norm-min.jpg");

  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 3;

    ref.current.position.x = 3 * Math.sin(state.clock.elapsedTime / 3);
    ref.current.position.z = 3 * Math.cos(state.clock.elapsedTime / 3);
  });

  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial map={map} normalMap={normal} bumpMap={bump} />
    </mesh>
  );
}

function Europa(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const loader = new THREE.TextureLoader();

  const bump = loader.load("./dist/assets/europa-bump-min.jpg");
  const map = loader.load("./dist/assets/europa-diff-min.jpg");
  const normal = loader.load("./dist/assets/europa-norm-min.jpg");

  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 5;

    ref.current.position.x = 5 * Math.sin(state.clock.elapsedTime / 5);
    ref.current.position.z = 5 * Math.cos(state.clock.elapsedTime / 5);
  });

  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[0.08, 32, 32]} />
      <meshStandardMaterial map={map} normalMap={normal} bumpMap={bump} />
    </mesh>
  );
}

function Ganymede(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const loader = new THREE.TextureLoader();

  const bump = loader.load("./dist/assets/ganymede-bump-min.jpg");
  const map = loader.load("./dist/assets/ganymede-diff-min.jpg");
  const normal = loader.load("./dist/assets/ganymede-norm-min.jpg");

  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 6;

    ref.current.position.x = 6 * Math.sin(state.clock.elapsedTime / 6);
    ref.current.position.z = 6 * Math.cos(state.clock.elapsedTime / 6);
  });

  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial map={map} normalMap={normal} bumpMap={bump} />
    </mesh>
  );
}

function Callisto(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const loader = new THREE.TextureLoader();

  const bump = loader.load("./dist/assets/callisto-bump-min.jpg");
  const map = loader.load("./dist/assets/callisto-diff-min.jpg");
  const normal = loader.load("./dist/assets/callisto-norm-min.jpg");

  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 8;

    ref.current.position.x = 8 * Math.sin(state.clock.elapsedTime / 8);
    ref.current.position.z = 8 * Math.cos(state.clock.elapsedTime / 8);
  });

  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial map={map} normalMap={normal} bumpMap={bump} />
    </mesh>
  );
}

function Stars() {
  const image = useLoader(THREE.TextureLoader, "./dist/assets/star.png");
  let positions = useMemo(() => {
    let positions: number[] = [];
    for (let i = 0; i < 500; i++) {
      const x = 50 + THREE.MathUtils.randFloatSpread(1000);
      const y = 50 + THREE.MathUtils.randFloatSpread(1000);
      const z = 50 + THREE.MathUtils.randFloatSpread(1000);
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, []);
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={image}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <Canvas style={{ background: "black" }}>
    <Jupiter position={[0, 0, 0]} />
    <Io position={[0, 0, 3]} />
    <Europa position={[0, 0, 5]} />
    <Ganymede position={[0, 0, 6]} />
    <Callisto position={[0, 0, 8]} />
    <pointLight position={[40, 0, 40]} />
    <Sun position={[45, 0, 45]} />
    <Stars />
    <OrbitControls />
  </Canvas>
);
