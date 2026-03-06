"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface InteractiveStarProps {
  message: string
  position: { x: number; y: number }
  delay: number
  onReveal: () => void
  isRevealed: boolean
}

export function InteractiveStar({
  message,
  position,
  delay,
  onReveal,
  isRevealed,
}: InteractiveStarProps) {
  const [showMessage, setShowMessage] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true)
      setShowMessage(true)
      onReveal()
    } else {
      setShowMessage(!showMessage)
    }
  }

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 2, duration: 0.8, ease: "easeOut" }}
    >
      {/* Star glow background */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,250,220,0.4) 0%, transparent 70%)",
          width: "80px",
          height: "80px",
          left: "-24px",
          top: "-24px",
        }}
        animate={{
          scale: isClicked ? [1, 1.5, 1.2] : [1, 1.2, 1],
          opacity: isClicked ? [0.6, 1, 0.8] : [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: isClicked ? 0.5 : 3,
          repeat: isClicked ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Star shape - larger touch target */}
      <motion.button
        onClick={handleClick}
        className="relative z-10 p-3 -m-3"
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          filter: isClicked
            ? "drop-shadow(0 0 16px rgba(255,250,200,1))"
            : "drop-shadow(0 0 10px rgba(255,250,200,0.7))",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          className="text-yellow-100"
        >
          <motion.path
            d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L17.09 19.02L12 15.77L6.91 19.02L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z"
            fill="currentColor"
            animate={{
              fill: isClicked ? "#FFF9E0" : "#FFF5CC",
            }}
          />
        </svg>
      </motion.button>

      {/* Message bubble - positioned based on star location */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`absolute z-20 w-48 sm:w-56 ${
              position.y > 50 
                ? "bottom-12" 
                : "top-12"
            } ${
              position.x > 50 
                ? "right-0" 
                : "left-0"
            }`}
          >
            <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-2xl px-4 py-3 shadow-xl">
              <p className="text-sm text-slate-200 text-center font-light leading-relaxed">
                {message}
              </p>
            </div>
            {/* Arrow - positioned based on bubble location */}
            <div 
              className={`absolute w-3 h-3 rotate-45 bg-slate-900/95 border-slate-700/50 ${
                position.y > 50 
                  ? "-bottom-1.5 border-b border-r" 
                  : "-top-1.5 border-l border-t"
              } ${
                position.x > 50 
                  ? "right-4" 
                  : "left-4"
              }`} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
