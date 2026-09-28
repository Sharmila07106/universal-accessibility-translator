import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { QuadraticBezierCurve3, Vector3, InstancedMesh, Object3D } from 'three';

export default function BridgeScene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  // Create a bridge curve
  const curve = useMemo(() => {
    const start = new Vector3(-4, -1, 0);
    const end = new Vector3(4, -1, 0);
    const mid = new Vector3(0, 3, 0);
    if (isMobile) {
      start.set(-2, -1, 0);
      end.set(2, -1, 0);
      mid.set(0, 2, 0);
    }
    return new QuadraticBezierCurve3(start, mid, end);
  }, [isMobile]);

  const particleCount = isMobile ? 100 : 300;
  const particlesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  
  const [particleData, setParticleData] = useState(() => 
    new Array(particleCount).fill(0).map(() => ({
      t: Math.random(),
      speed: 0.05 + Math.random() * 0.1,
      offset: new Vector3(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4
      )
    }))
  );

  useEffect(() => {
    setParticleData(new Array(particleCount).fill(0).map(() => ({
      t: Math.random(),
      speed: 0.05 + Math.random() * 0.1,
      offset: new Vector3(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4
      )
    })));
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    // Optional parallax
    if (!isMobile) {
      state.camera.position.x += (state.mouse.x * 0.5 - state.camera.position.x) * 0.05;
      state.camera.position.y += (state.mouse.y * 0.5 - state.camera.position.y) * 0.05;
      state.camera.lookAt(0, 0, 0);
    }

    // Animate particles
    particleData.forEach((data, i) => {
      data.t += data.speed * delta;
      if (data.t > 1) data.t = 0;

      const pos = curve.getPoint(data.t);
      dummy.position.copy(pos).add(data.offset);
      
      // Scale pulse
      const s = 1 + Math.sin(data.t * Math.PI * 10) * 0.5;
      dummy.scale.set(s, s, s);
      
      dummy.updateMatrix();
      particlesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 4, 2]} intensity={2} color="#4338CA" />
      <pointLight position={[-4, 0, 2]} intensity={2} color="#0D9488" />
      <pointLight position={[4, 0, 2]} intensity={2} color="#2DD4BF" />

      {/* The glowing arch */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
        <meshStandardMaterial color="#4338CA" emissive="#4338CA" emissiveIntensity={2} transparent opacity={0.3} />
      </mesh>

      {/* End nodes */}
      <mesh position={isMobile ? [-2, -1, 0] : [-4, -1, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#0D9488" emissive="#0D9488" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={isMobile ? [-2, -1.3, 0] : [-4, -1.3, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 0.4, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      <mesh position={isMobile ? [2, -1, 0] : [4, -1, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#4338CA" emissive="#4338CA" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={isMobile ? [2, -1.3, 0] : [4, -1.3, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 0.4, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#2DD4BF" transparent opacity={0.8} />
      </instancedMesh>
    </group>
  );
}
