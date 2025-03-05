"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function DecorativeBackground() {
  const [decorations, setDecorations] = useState<
    Array<{ id: number; type: string; x: number; y: number; size: number; rotation: number }>
  >([])

  useEffect(() => {
    const newDecorations = []
    const types = ["spoon", "fork", "plate"]

    for (let i = 0; i < 15; i++) {
      newDecorations.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 60,
        rotation: Math.random() * 360,
      })
    }

    setDecorations(newDecorations)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {decorations.map((decoration) => (
        <motion.div
          key={decoration.id}
          className={`absolute ${
            decoration.type === "spoon"
              ? "spoon-decoration"
              : decoration.type === "fork"
                ? "fork-decoration"
                : "plate-decoration"
          }`}
          style={{
            left: `${decoration.x}%`,
            top: `${decoration.y}%`,
            width: decoration.type === "fork" ? decoration.size / 2 : decoration.size,
            height: decoration.type === "fork" ? decoration.size : decoration.size,
          }}
          animate={{
            rotate: decoration.rotation,
            y: [0, 10, 0],
          }}
          transition={{
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 3 + Math.random() * 5,
              ease: "easeInOut",
            },
            rotate: {
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  )
}

