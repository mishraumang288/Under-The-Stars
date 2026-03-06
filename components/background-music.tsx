"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/audio/bg-music.mp3")
    audio.loop = true
    audio.volume = 0.15 // Low volume
    audioRef.current = audio

    // Try to autoplay
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        // Autoplay was prevented, wait for user interaction
        const handleInteraction = async () => {
          try {
            await audio.play()
            setIsPlaying(true)
            document.removeEventListener("click", handleInteraction)
            document.removeEventListener("touchstart", handleInteraction)
          } catch {
            // Still failed
          }
        }
        document.addEventListener("click", handleInteraction)
        document.addEventListener("touchstart", handleInteraction)
      }
    }

    playAudio()

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
      
      {/* Playing indicator */}
      {isPlaying && !isMuted && (
        <motion.span
          className="absolute -top-1 -right-1 w-2 h-2 bg-rose-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  )
}
