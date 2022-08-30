import {
  CubeCamera,
  OrbitControls,
  PerspectiveCamera,
  EnvironmentMap,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import React from "react";
import { BlendFunction } from "postprocessing";
import Boxes from "./Boxes";
import Car from "./Car";
import Ground from "./Ground";
import Rings from "./Rings";
import FloatingGrid from "./FloatingGrid";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <EnvironmentMap map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      <Rings />
      <FloatingGrid />
      <Boxes />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />
      <Ground />
      <EffectComposer>
        <DepthOfField
          focusDistance={0.0035}
          focalLength={0.02}
          bokehScale={3}
          height={480}
        />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.3}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
}

export default CarShow;
