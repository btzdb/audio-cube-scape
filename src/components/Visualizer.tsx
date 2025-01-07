import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAudioContext } from '../contexts/AudioContext';
import { useVisualizerStore } from '../store/useVisualizerStore';

export function Visualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const { analyser } = useAudioContext();
  const { settings } = useVisualizerStore();
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    
    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Cube setup
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        bassIntensity: { value: 0 },
        primaryColor: { value: new THREE.Color(settings.customColors.primary) },
        secondaryColor: { value: new THREE.Color(settings.customColors.secondary) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float bassIntensity;
        uniform float time;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;
          float scale = 1.0 + bassIntensity * 0.2;
          pos *= scale;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform float time;
        uniform float bassIntensity;
        
        void main() {
          float pulse = bassIntensity * 0.5;
          vec3 color = mix(primaryColor, secondaryColor, vUv.x + sin(time) * 0.5);
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          vec3 finalColor = mix(color, vec3(1.0), fresnel * (0.5 + pulse));
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true
    });

    cubeRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(cubeRef.current);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    sceneRef.current.add(pointLight);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (cubeRef.current && analyser) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate bass frequency average (first few frequency bins)
        const bassFreqs = dataArray.slice(0, 10);
        const bassAvg = bassFreqs.reduce((a, b) => a + b, 0) / bassFreqs.length;
        const bassIntensity = bassAvg / 255;

        // Update shader uniforms
        const material = cubeRef.current.material as THREE.ShaderMaterial;
        material.uniforms.time.value += 0.01 * settings.bassBumpSpeed;
        material.uniforms.bassIntensity.value = bassIntensity * settings.bassBumpIntensity;
        material.uniforms.primaryColor.value.set(settings.customColors.primary);
        material.uniforms.secondaryColor.value.set(settings.customColors.secondary);

        // Rotate cube
        cubeRef.current.rotation.x += 0.01 * settings.bassBumpSpeed;
        cubeRef.current.rotation.y += 0.01 * settings.bassBumpSpeed;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [analyser, settings]);

  return <div ref={containerRef} className="visualizer-container" />;
}

export default Visualizer;