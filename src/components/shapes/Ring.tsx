import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export function Ring({ frequency }: { frequency: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { settings } = useVisualizerStore();
  const prevFrequency = useRef(frequency);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        frequency: { value: 0 },
        bassBumpIntensity: { value: settings.bassBumpIntensity },
        bassBumpSpeed: { value: settings.bassBumpSpeed },
        primaryColor: { value: new THREE.Color(settings.customColors.primary) },
        secondaryColor: { value: new THREE.Color(settings.customColors.secondary) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float frequency;
        uniform float bassBumpIntensity;
        uniform float bassBumpSpeed;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          float angle = atan(pos.y, pos.x);
          float displacement = sin(angle * 16.0 + time * bassBumpSpeed) * 
                             cos(pos.z * 8.0 + time * bassBumpSpeed);
          
          float scale = 1.0 + pow(frequency / 255.0, 1.8) * bassBumpIntensity;
          pos *= scale;
          
          float waveIntensity = pow(frequency / 255.0, 2.0) * bassBumpIntensity;
          pos += normal * displacement * waveIntensity * 0.3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float frequency;
        uniform float bassBumpIntensity;
        uniform float bassBumpSpeed;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          float pulse = pow(frequency / 255.0, 1.5);
          float t = time * bassBumpSpeed;
          
          vec3 color = mix(
            primaryColor,
            secondaryColor,
            0.5 + 0.5 * sin(t + vUv.x * 6.28)
          );
          
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          float glow = 0.3 / length(vUv - 0.5) * pulse * bassBumpIntensity;
          
          vec3 finalColor = mix(color, vec3(1.0), fresnel * 0.7);
          finalColor += vec3(glow) * pulse;
          
          gl_FragColor = vec4(finalColor, 0.9);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [settings.bassBumpIntensity, settings.bassBumpSpeed, settings.customColors]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const lerpFactor = 0.15;
    const smoothFrequency = THREE.MathUtils.lerp(
      prevFrequency.current,
      frequency,
      lerpFactor
    );
    prevFrequency.current = smoothFrequency;
    
    meshRef.current.rotation.z += 0.005 * settings.bassBumpSpeed;
    const scale = 1 + (smoothFrequency / 255) * settings.bassBumpIntensity;
    meshRef.current.scale.setScalar(scale);
    
    material.uniforms.time.value = state.clock.elapsedTime;
    material.uniforms.frequency.value = smoothFrequency;
    material.uniforms.primaryColor.value.set(settings.customColors.primary);
    material.uniforms.secondaryColor.value.set(settings.customColors.secondary);
  });

  return (
    <mesh ref={meshRef} material={material}>
      <torusGeometry args={[1, 0.3, 32, 100]} />
    </mesh>
  );
}