import * as THREE from 'three';
import { VisualizerSettings } from '../../../../types';
import { vertexShader, fragmentShader } from './shaders';

export const createShaderMaterial = (settings: VisualizerSettings) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      frequency: { value: 0 },
      primaryColor: { value: new THREE.Color(settings.customColors.primary) },
      secondaryColor: { value: new THREE.Color(settings.customColors.secondary) },
      bassBumpIntensity: { value: settings.bassBumpIntensity },
      bassBumpSpeed: { value: settings.bassBumpSpeed }
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide
  });
};

export const updateMaterialUniforms = (
  material: THREE.ShaderMaterial,
  settings: VisualizerSettings,
  time: number,
  frequency: number
) => {
  material.uniforms.time.value = time;
  material.uniforms.frequency.value = frequency;
  material.uniforms.bassBumpIntensity.value = settings.bassBumpIntensity;
  material.uniforms.bassBumpSpeed.value = settings.bassBumpSpeed;
  material.uniforms.primaryColor.value.set(settings.customColors.primary);
  material.uniforms.secondaryColor.value.set(settings.customColors.secondary);
};