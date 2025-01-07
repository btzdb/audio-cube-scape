import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { VisualizerSettings } from '../../../types';
import { createShaderMaterial, updateMaterialUniforms } from './utils/materialUtils';

interface CubeShaderMaterialProps {
  settings: VisualizerSettings;
  frequency: number;
}

export function CubeShaderMaterial({ settings, frequency }: CubeShaderMaterialProps) {
  const material = useMemo(() => createShaderMaterial(settings), []);

  useFrame((state) => {
    updateMaterialUniforms(
      material,
      settings,
      state.clock.getElapsedTime(),
      frequency
    );
  });

  return <shaderMaterial args={[material]} />;
}