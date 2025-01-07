import React, { useMemo, useEffect } from 'react';
import { useVisualizerStore } from '../../../store/useVisualizerStore';
import { createShaderMaterial, updateMaterialUniforms } from './utils/materialUtils';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CubeShaderMaterialProps {
  frequency: number;
}

export function CubeShaderMaterial({ frequency }: CubeShaderMaterialProps) {
  const { settings } = useVisualizerStore();
  
  const material = useMemo(() => {
    return createShaderMaterial(settings);
  }, [settings]);

  useEffect(() => {
    if (material && material.uniforms) {
      material.uniforms.primaryColor.value = new THREE.Color(settings.customColors.primary);
      material.uniforms.secondaryColor.value = new THREE.Color(settings.customColors.secondary);
      material.needsUpdate = true;
    }
  }, [settings.customColors, material]);

  useFrame((state) => {
    if (material && material.uniforms) {
      updateMaterialUniforms(
        material,
        settings,
        state.clock.getElapsedTime(),
        frequency
      );
    }
  });

  return material ? <primitive object={material} attach="material" /> : null;
}