'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function FloatingShape({ position, shape, color }: { position: [number, number, number], shape: string, color: string }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const renderShape = () => {
    switch (shape) {
      case 'sphere':
        return <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position} />;
      case 'box':
        return <Box ref={meshRef} args={[0.8, 0.8, 0.8]} position={position} />;
      case 'torus':
        return <Torus ref={meshRef} args={[0.4, 0.2, 16, 32]} position={position} />;
      case 'octahedron':
        return <Octahedron ref={meshRef} args={[0.6]} position={position} />;
      default:
        return <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position} />;
    }
  };

  return (
    <mesh>
      {renderShape()}
      <meshStandardMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

export default function FloatingShapes3D() {
  const shapes = [
    { position: [-8, 2, -5] as [number, number, number], shape: 'sphere', color: '#22c55e' },
    { position: [8, -1, -3] as [number, number, number], shape: 'box', color: '#16a34a' },
    { position: [-5, 4, -8] as [number, number, number], shape: 'torus', color: '#4ade80' },
    { position: [6, 1, -6] as [number, number, number], shape: 'octahedron', color: '#22c55e' },
    { position: [-3, -2, -4] as [number, number, number], shape: 'sphere', color: '#16a34a' },
    { position: [4, 3, -7] as [number, number, number], shape: 'box', color: '#4ade80' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#22c55e" />
        
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            position={shape.position}
            shape={shape.shape}
            color={shape.color}
          />
        ))}
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
