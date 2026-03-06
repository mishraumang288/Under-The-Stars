"use client"

import { motion } from "framer-motion"

interface MoonProps {
  isGlowing: boolean
}

export function Moon({ isGlowing }: MoonProps) {
  return (
    <div className="relative">
      {/* Outer glow layers */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "280px",
          height: "280px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,250,220,0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: isGlowing ? [1, 1.3, 1.2] : [1, 1.1, 1],
          opacity: isGlowing ? [0.6, 1, 0.8] : [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: isGlowing ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: "220px",
          height: "220px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,250,220,0.2) 0%, transparent 60%)",
        }}
        animate={{
          scale: isGlowing ? [1, 1.2, 1.1] : [1, 1.05, 1],
          opacity: isGlowing ? [0.7, 1, 0.9] : [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: isGlowing ? 1.5 : 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Moon body */}
      <motion.div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full"
        style={{
          background: "linear-gradient(135deg, #FFF9E8 0%, #F5EED6 50%, #E8E0C8 100%)",
          boxShadow: isGlowing
            ? "0 0 60px rgba(255,250,220,0.8), 0 0 100px rgba(255,250,220,0.5), inset -8px -8px 20px rgba(0,0,0,0.1)"
            : "0 0 40px rgba(255,250,220,0.5), 0 0 60px rgba(255,250,220,0.3), inset -8px -8px 20px rgba(0,0,0,0.1)",
        }}
        animate={
          isGlowing
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 60px rgba(255,250,220,0.8), 0 0 100px rgba(255,250,220,0.5), inset -8px -8px 20px rgba(0,0,0,0.1)",
                  "0 0 80px rgba(255,250,220,1), 0 0 140px rgba(255,250,220,0.7), inset -8px -8px 20px rgba(0,0,0,0.1)",
                  "0 0 60px rgba(255,250,220,0.8), 0 0 100px rgba(255,250,220,0.5), inset -8px -8px 20px rgba(0,0,0,0.1)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Moon craters */}
        <div
          className="absolute w-6 h-6 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)",
            top: "20%",
            left: "25%",
          }}
        />
        <div
          className="absolute w-4 h-4 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)",
            top: "50%",
            left: "60%",
          }}
        />
        <div
          className="absolute w-8 h-8 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)",
            top: "65%",
            left: "30%",
          }}
        />
      </motion.div>
    </div>
  )
}
