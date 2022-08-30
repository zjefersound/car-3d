import { useLoader } from "@react-three/fiber";
import React from "react";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const cars = [
   {
    source: process.env.PUBLIC_URL + "models/car/scene.gltf",
    scale: [0.005, 0.005, 0.005],
    position: [0, -0.035, 0]
   },
   {
    source: process.env.PUBLIC_URL + "models/dodge_challenger/scene.gltf",
    scale: [0.009, 0.009, 0.009],
    position: [2.2, 1.27, -2.9]
   }
]

function Car() {
  const currentCar = cars[0];
  const gltf = useLoader(
    GLTFLoader,
    currentCar.source
  );

  useEffect(() => {
    gltf.scene.scale.set(...currentCar.scale);
    gltf.scene.position.set(...currentCar.position);
    gltf.scene.traverse(object => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    })
  }, [gltf]);
  return <primitive object={gltf.scene} />;
}

export default Car;
