import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVisualizerStore } from '../../../store/useVisualizerStore';
import { CubeShaderMaterial } from './CubeShaderMaterial';

interface CubeProps {
  frequency: number;
}

export function Cube({ frequency }: CubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prevFrequency = useRef(frequency);
  const { settings } = useVisualizerStore();

  useFrame((state) => {
    if (!meshRef.current) return;

    const lerpFactor = 0.15;
    const smoothFrequency = THREE.MathUtils.lerp(
      prevFrequency.current,
      frequency,
      lerpFactor
    );
    prevFrequency.current = smoothFrequency;

    const rotationSpeed = 0.01 * settings.bassBumpSpeed * 
                         (1 + Math.pow(smoothFrequency / 255, 1.2));
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed * 1.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <CubeShaderMaterial frequency={frequency} />
    </mesh>
  );
}