import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVisualizerStore } from '../../../store/useVisualizerStore';
import type { CubeUniforms, CubeShaderProps } from './types/shaderTypes';

export function CubeShaderMaterial({ frequency }: CubeShaderProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { settings } = useVisualizerStore();
  const prevFrequency = useRef(frequency);

  const uniforms = useMemo<CubeUniforms>(() => ({
    time: { value: 0 },
    frequency: { value: frequency },
    primaryColor: { value: new THREE.Color(settings.customColors.primary) },
    secondaryColor: { value: new THREE.Color(settings.customColors.secondary) },
    bassBumpIntensity: { value: settings.bassBumpIntensity },
    bassBumpSpeed: { value: settings.bassBumpSpeed }
  }), [
    frequency, 
    settings.customColors.primary,
    settings.customColors.secondary,
    settings.bassBumpIntensity,
    settings.bassBumpSpeed
  ]);

  useEffect(() => {
    if (!materialRef.current) return;
    
    try {
      materialRef.current.uniforms.primaryColor.value.set(settings.customColors.primary);
      materialRef.current.uniforms.secondaryColor.value.set(settings.customColors.secondary);
      materialRef.current.needsUpdate = true;
    } catch (error) {
      console.error('Error updating shader uniforms:', error);
    }
  }, [settings.customColors]);

  useFrame((state) => {
    if (!materialRef.current) return;

    try {
      const lerpFactor = 0.15;
      const smoothFrequency = THREE.MathUtils.lerp(
        prevFrequency.current,
        frequency,
        lerpFactor
      );
      prevFrequency.current = smoothFrequency;

      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.frequency.value = smoothFrequency;
      materialRef.current.uniforms.bassBumpIntensity.value = settings.bassBumpIntensity;
      materialRef.current.uniforms.bassBumpSpeed.value = settings.bassBumpSpeed;
    } catch (error) {
      console.error('Error in animation frame:', error);
    }
  });

  useEffect(() => {
    return () => {
      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, []);

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={/* ... keep existing code */}
      fragmentShader={/* ... keep existing code */}
      transparent
      side={THREE.DoubleSide}
    />
  );
}