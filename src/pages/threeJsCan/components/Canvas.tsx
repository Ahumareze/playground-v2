import { Canvas as ThreeCanvas } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, Center } from "@react-three/drei"

function CocaColaCan() {
  const { scene } = useGLTF("/models/coca_cola_can.glb")

  return (
    <Center>
        <primitive 
            object={scene} 
            scale={0.8}
            rotation={[0, Math.PI, 0]}
        />
    </Center>
  )
}

export default function Canvas() {
  return (
    <div className="w-full h-screen bg-black/20 fixed top-0 left-0">
      <ThreeCanvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        {/* Model */}
        <CocaColaCan />

        {/* Controls */}
        <OrbitControls enableZoom={false} />

        {/* Optional but 🔥 */}
        <Environment preset="studio" />
      </ThreeCanvas>
    </div>
  )
}

useGLTF.preload("/models/coca_cola_can.glb")