import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAudioContext } from '@/hooks/useAudioContext';

const Visualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    
    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Cube setup
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00F5FF,
      emissive: 0x00F5FF,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.8,
    });
    cubeRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(cubeRef.current);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00F5FF, 1);
    pointLight.position.set(5, 5, 5);
    sceneRef.current.add(pointLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="visualizer-container" />;
};

export default Visualizer;