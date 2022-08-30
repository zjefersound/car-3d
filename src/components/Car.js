import { useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const cars = [
  {
    source: process.env.PUBLIC_URL + "models/car/scene.gltf",
    scale: [0.005, 0.005, 0.005],
    position: [0, -0.035, 0],
  },
  {
    source: process.env.PUBLIC_URL + "models/dodge_challenger/scene.gltf",
    scale: [0.009, 0.009, 0.009],
    position: [2.2, 1.27, -2.9],
  },
];

function Car() {
  const currentCar = cars[0];
  const gltf = useLoader(GLTFLoader, currentCar.source);

  useEffect(() => {
    gltf.scene.scale.set(...currentCar.scale);
    gltf.scene.position.set(...currentCar.position);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0];
    group.children[0].rotation.x = t * 2;
    group.children[2].rotation.x = t * 2;
    group.children[4].rotation.x = t * 2;
    group.children[6].rotation.x = t * 2;
  });
  return <primitive object={gltf.scene} />;
}

export default Car;
