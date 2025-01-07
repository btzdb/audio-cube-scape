import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useAudioContext } from '../contexts/AudioContext';
import { useVisualizerStore } from '../store/useVisualizerStore';
import { Cube } from './shapes/Cube';
import { Ring } from './shapes/Ring';

export function ThreeVisualizer() {
  const { analyser } = useAudioContext();
  const [bassFrequency, setBassFrequency] = useState(0);
  const { settings } = useVisualizerStore();

  useEffect(() => {
    if (!analyser) return;

    let animationFrame: number;

    const updateBassFrequency = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);
      
      // Enhanced bass detection with weighted average
      const bassRange = dataArray.slice(0, 10);
      const bassWeights = bassRange.map((value, index) => 
        value * Math.pow(0.9, index)
      );
      const weightedSum = bassWeights.reduce((a, b) => a + b, 0);
      const weightedAvg = weightedSum / bassWeights.length;
      setBassFrequency(weightedAvg);
      
      animationFrame = requestAnimationFrame(updateBassFrequency);
    };

    updateBassFrequency();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [analyser]);

  const renderShape = () => {
    switch (settings.shape) {
      case 'cube':
        return <Cube frequency={bassFrequency} />;
      case 'ring':
        return <Ring frequency={bassFrequency} />;
      default:
        return <Cube frequency={bassFrequency} />;
    }
  };

  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-10, -10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.5}
        />
        {renderShape()}
      </Canvas>
    </div>
  );
}