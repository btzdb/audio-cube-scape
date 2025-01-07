import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVisualizerStore } from '../../../store/useVisualizerStore';
import { vertexShader, fragmentShader } from './utils/shaders';

interface CubeShaderMaterialProps {
  frequency: number;
}

export function CubeShaderMaterial({ frequency }: CubeShaderMaterialProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { settings } = useVisualizerStore();

  const uniforms = {
    time: { value: 0 },
    frequency: { value: frequency },
    primaryColor: { value: new THREE.Color(settings.customColors.primary) },
    secondaryColor: { value: new THREE.Color(settings.customColors.secondary) },
    bassBumpIntensity: { value: settings.bassBumpIntensity },
    bassBumpSpeed: { value: settings.bassBumpSpeed }
  };

  useFrame((state) => {
    if (!materialRef.current) return;
    
    materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.frequency.value = frequency;
    materialRef.current.uniforms.primaryColor.value.set(settings.customColors.primary);
    materialRef.current.uniforms.secondaryColor.value.set(settings.customColors.secondary);
    materialRef.current.uniforms.bassBumpIntensity.value = settings.bassBumpIntensity;
    materialRef.current.uniforms.bassBumpSpeed.value = settings.bassBumpSpeed;
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
      side={THREE.DoubleSide}
    />
  );
}