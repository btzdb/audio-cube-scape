import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVisualizerStore } from '../../store/useVisualizerStore';

interface CubeProps {
  frequency: number;
}

export function Cube({ frequency = 0 }: CubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { settings } = useVisualizerStore();
  const prevFrequency = useRef(0);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        frequency: { value: 0 },
        primaryColor: { value: new THREE.Color(settings.customColors.primary || '#ff0000') },
        secondaryColor: { value: new THREE.Color(settings.customColors.secondary || '#00ff00') },
        bassBumpIntensity: { value: settings.bassBumpIntensity || 0.5 },
        bassBumpSpeed: { value: settings.bassBumpSpeed || 0.5 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        uniform float time;
        uniform float frequency;
        uniform float bassBumpIntensity;
        uniform float bassBumpSpeed;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;
          float wave = sin(pos.x * 5.0 + time * bassBumpSpeed) * 
                      sin(pos.y * 5.0 + time * bassBumpSpeed) * 
                      sin(pos.z * 5.0 + time * bassBumpSpeed);
                      
          float scale = 1.0 + pow(frequency / 255.0, 2.0) * bassBumpIntensity;
          pos *= scale;
          
          pos += normal * wave * (frequency / 255.0) * bassBumpIntensity * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        uniform float time;
        uniform float frequency;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform float bassBumpIntensity;
        uniform float bassBumpSpeed;
        
        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
          
          float pulse = pow(frequency / 255.0, 1.5);
          float t = time * bassBumpSpeed;
          
          vec3 color = mix(
            primaryColor,
            secondaryColor,
            0.5 + 0.5 * sin(t + vUv.x * 6.28)
          );
          
          vec3 glowColor = mix(primaryColor, vec3(1.0), 0.5);
          float glow = 0.3 * pulse * bassBumpIntensity;
          
          vec3 finalColor = mix(color, glowColor, fresnel);
          finalColor += glowColor * glow * fresnel;
          
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, [settings.customColors.primary, settings.customColors.secondary, settings.bassBumpIntensity, settings.bassBumpSpeed]);

  useFrame((state) => {
    if (!meshRef.current) return;

    try {
      const lerpFactor = 0.15;
      const smoothFrequency = THREE.MathUtils.lerp(
        prevFrequency.current,
        frequency || 0,
        lerpFactor
      );
      prevFrequency.current = smoothFrequency;

      const rotationSpeed = 0.01 * (settings.bassBumpSpeed || 0.5) * 
                         (1 + Math.pow((smoothFrequency || 0) / 255, 1.2));
                         
      if (meshRef.current) {
        meshRef.current.rotation.x += rotationSpeed;
        meshRef.current.rotation.y += rotationSpeed * 1.5;
      }

      if (shaderMaterial.uniforms) {
        shaderMaterial.uniforms.time.value = state.clock.elapsedTime || 0;
        shaderMaterial.uniforms.frequency.value = smoothFrequency || 0;
        shaderMaterial.uniforms.bassBumpIntensity.value = settings.bassBumpIntensity || 0.5;
        shaderMaterial.uniforms.bassBumpSpeed.value = settings.bassBumpSpeed || 0.5;
        shaderMaterial.uniforms.primaryColor.value.set(settings.customColors.primary || '#ff0000');
        shaderMaterial.uniforms.secondaryColor.value.set(settings.customColors.secondary || '#00ff00');
      }
    } catch (error) {
      console.error('Error updating cube:', error);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}