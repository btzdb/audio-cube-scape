import React, { useMemo, useEffect } from 'react';
import { useVisualizerStore } from '../../../store/useVisualizerStore';
import { createShaderMaterial, updateMaterialUniforms } from './utils/materialUtils';
import { useFrame } from '@react-three/fiber';

interface CubeShaderMaterialProps {
  frequency: number;
}

export function CubeShaderMaterial({ frequency }: CubeShaderMaterialProps) {
  const { settings } = useVisualizerStore();
  
  const shaderMaterial = useMemo(() => createShaderMaterial(settings), []);

  useEffect(() => {
    shaderMaterial.uniforms.primaryColor.value.set(settings.customColors.primary);
    shaderMaterial.uniforms.secondaryColor.value.set(settings.customColors.secondary);
    shaderMaterial.needsUpdate = true;
  }, [settings.customColors, shaderMaterial]);

  useFrame((state) => {
    updateMaterialUniforms(
      shaderMaterial,
      settings,
      state.clock.elapsedTime,
      frequency
    );
  });

  return <shaderMaterial args={[shaderMaterial]} />;
}