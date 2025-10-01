'use client';

import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';

function Scene() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[-3, 0, 0]}>
          <meshStandardMaterial 
            color={isDark ? "#3b82f6" : "#8b5cf6"} 
            transparent 
            opacity={0.6} 
          />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Box args={[1, 1, 1]} position={[3, 0, 0]}>
          <meshStandardMaterial 
            color={isDark ? "#10b981" : "#f59e0b"} 
            transparent 
            opacity={0.7} 
          />
        </Box>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={3}>
        <Torus args={[0.8, 0.3, 16, 32]} position={[0, 2, 0]}>
          <meshStandardMaterial 
            color={isDark ? "#f472b6" : "#ef4444"} 
            transparent 
            opacity={0.5} 
          />
        </Torus>
      </Float>
    </>
  );
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
