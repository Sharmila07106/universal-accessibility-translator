
import { Canvas } from '@react-three/fiber';
import BridgeScene from './BridgeScene';

interface Props {
  reducedMotion: boolean;
}

export default function ThreeScene({ reducedMotion }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <BridgeScene />
    </Canvas>
  );
}
