"use client"

import React, { useRef, useState, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, Text, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"

// Create a safer Text component or remove if it's the issue
function NodeLabel({ label, position }: { label: string, position: [number, number, number] }) {
  return (
    <Text
      position={position}
      fontSize={0.2}
      color="white"
      font="https://fonts.gstatic.com/s/robotomono/v22/L0tkDFwv09SIn9m5H0619S2lyTmf.woff" // Explicit font URL to avoid loading issues
      anchorX="center"
      anchorY="middle"
    >
      {label}
    </Text>
  )
}

function InfrastructureNode({ position, color, label }: any) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.002
    }
  })

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial
            color={hovered ? "#00ffff" : color}
            speed={2}
            distort={0.4}
            radius={1}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.5}
          />
        </mesh>
      </Float>
      
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {hovered && (
        <Sparkles count={50} scale={2} size={2} speed={0.4} color={color} />
      )}
    </group>
  )
}

function ConnectionLines() {
  const points = useMemo(() => {
    const p = []
    // Connect nodes in a web-like structure
    const nodePositions = [
      [0, 0, 0],
      [4, 2, -2],
      [-4, 1, -3],
      [2, -3, -1],
      [-2, -2, 2],
      [3, 0, 3],
    ]
    
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (Math.random() > 0.4) {
          p.push(new THREE.Vector3(...nodePositions[i]))
          p.push(new THREE.Vector3(...nodePositions[j]))
        }
      }
    }
    return p
  }, [])

  return (
    <lineSegments>
      <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(points)} />
      <lineBasicMaterial attach="material" color="#4444ff" transparent opacity={0.2} />
    </lineSegments>
  )
}

export default function DevOpsInteractiveHub() {
  const [selectedTopic, setSelectedTopic] = useState<null | number>(null)

  const topics = [
    { title: "Kubernetes Clusters", description: "Auto-scaling, self-healing orchestration clusters managed across multi-cloud environments.", color: "#326ce5" },
    { title: "CI/CD Pipelines", description: "Seamless code-to-cloud automation using GitHub Actions and ArgoCD.", color: "#844fba" },
    { title: "Zero Trust Security", description: "Encrypted tunnels and identity-aware access for infrastructure components.", color: "#f38020" },
    { title: "Data Replication", description: "Cross-region Postgres replication with automated failover and sync monitoring.", color: "#0064a5" },
  ]

  return (
    <section id="visualizer" className="relative h-[800px] w-full bg-[#0a0a0f] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#aa00ff" intensity={0.5} />
          
          <InfrastructureNode position={[0, 0, 0]} color="#00ffff" label="Core API" />
          <InfrastructureNode position={[4, 2, -2]} color="#ff00ff" label="K8s Nodes" />
          <InfrastructureNode position={[-4, 1, -3]} color="#ffff00" label="Database" />
          <InfrastructureNode position={[2, -3, -1]} color="#00ff00" label="Auth Svc" />
          <InfrastructureNode position={[-2, -2, 2]} color="#ff4400" label="CDN" />
          <InfrastructureNode position={[3, 0, 3]} color="#ffffff" label="Prometheus" />
          
          <ConnectionLines />
          <Sparkles count={200} scale={20} size={1} speed={0.2} opacity={0.3} />
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 pointer-events-none">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16 pointer-events-auto"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              Cloud <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Infrastructure</span> Visualizer
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Interact with live infrastructure components. Hover over nodes to see their relationships 
              and explore our automated ecosystem architecture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4 pointer-events-auto">
            {topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedTopic(selectedTopic === i ? null : i)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  selectedTopic === i 
                    ? "bg-white/10 border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.1)]" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: topic.color }} />
                  {topic.title}
                </h3>
                <AnimatePresence>
                  {selectedTopic === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-gray-400 text-sm overflow-hidden"
                    >
                      {topic.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Gradient Overlays */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  )
}
