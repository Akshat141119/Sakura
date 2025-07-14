import { useEffect, useRef } from "react";
import "./PetalLayer.css";

export default function PetalLayer() {
  const layerRef = useRef(null);

  useEffect(() => {
    const container = layerRef.current;
    const maxPetals = 25;

    for (let i = 0; i < maxPetals; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${4 + Math.random() * 4}s`;
      petal.style.opacity = Math.random().toFixed(2);
      container.appendChild(petal);

      setTimeout(() => {
        container.removeChild(petal);
      }, 9000);
    }
  }, []);

  return <div className="petal-layer" ref={layerRef}></div>;
}