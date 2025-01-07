import * as THREE from 'three';

export interface CubeUniforms extends Record<string, THREE.IUniform<any>> {
  time: THREE.IUniform<number>;
  frequency: THREE.IUniform<number>;
  primaryColor: THREE.IUniform<THREE.Color>;
  secondaryColor: THREE.IUniform<THREE.Color>;
  bassBumpIntensity: THREE.IUniform<number>;
  bassBumpSpeed: THREE.IUniform<number>;
}

export interface CubeShaderProps {
  frequency: number;
}