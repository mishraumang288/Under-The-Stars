"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Pre-computed star positions to avoid hydration mismatch
const STAR_DATA = [
  { x: 5, y: 10 }, { x: 15, y: 5 }, { x: 25, y: 15 }, { x: 35, y: 8 }, { x: 45, y: 12 },
  { x: 55, y: 3 }, { x: 65, y: 18 }, { x: 75, y: 7 }, { x: 85, y: 14 }, { x: 95, y: 9 },
  { x: 8, y: 25 }, { x: 18, y: 30 }, { x: 28, y: 22 }, { x: 38, y: 35 }, { x: 48, y: 28 },
  { x: 58, y: 33 }, { x: 68, y: 26 }, { x: 78, y: 38 }, { x: 88, y: 31 }, { x: 98, y: 24 },
  { x: 3, y: 45 }, { x: 13, y: 52 }, { x: 23, y: 48 }, { x: 33, y: 55 }, { x: 43, y: 42 },
  { x: 53, y: 58 }, { x: 63, y: 44 }, { x: 73, y: 51 }, { x: 83, y: 47 }, { x: 93, y: 54 },
  { x: 7, y: 65 }, { x: 17, y: 72 }, { x: 27, y: 68 }, { x: 37, y: 75 }, { x: 47, y: 62 },
  { x: 57, y: 78 }, { x: 67, y: 64 }, { x: 77, y: 71 }, { x: 87, y: 67 }, { x: 97, y: 74 },
  { x: 2, y: 85 }, { x: 12, y: 92 }, { x: 22, y: 88 }, { x: 32, y: 95 }, { x: 42, y: 82 },
  { x: 52, y: 98 }, { x: 62, y: 84 }, { x: 72, y: 91 }, { x: 82, y: 87 }, { x: 92, y: 94 },
]

export function TwinklingStars() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 overflow-hidden pointer-events-none" />
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {STAR_DATA.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
          }}
          initial={{ opacity: 0.2 }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + (i % 4),
            delay: (i % 5) * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
