import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import Earth from "./Earth.jsx"

function EarthCanvas() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Canvas  
        camera={{ position: [0.5, 0.5, 0.5] }}>
      <ambientLight intensity={2}/>
      <OrbitControls
   
  />

      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <Environment preset='sunset'/>
    </Canvas>

    </>
  )
}

export default EarthCanvas
