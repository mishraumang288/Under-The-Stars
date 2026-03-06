"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TwinklingStars } from "@/components/twinkling-stars"
import { Moon } from "@/components/moon"
import { InteractiveStar } from "@/components/interactive-star"
import { HeartParticles } from "@/components/heart-particles"
import { BackgroundMusic } from "@/components/background-music"

const starMessages = [
  { message: "I never wanted to hurt you, leave you, or cause you pain.", position: { x: 12, y: 15 } },
  { message: "You mean more to me than you know.", position: { x: 78, y: 12 } },
  { message: "Sorry for being nonchalant.", position: { x: 85, y: 40 } },
  { message: "I am missing you alot right now, Please write me a message.", position: { x: 8, y: 45 } },
  { message: "I'm truly sorry.", position: { x: 82, y: 65 } },
  { message: "I just want to make things right and move forward.", position: { x: 15, y: 70 } },
]

type Phase = "start" | "intro" | "stars" | "complete" | "forgiven" | "needtime"

export default function ApologyPage() {
  const [phase, setPhase] = useState<Phase>("start")
  const [revealedStars, setRevealedStars] = useState<Set<number>>(new Set())
  const [showSecondIntro, setShowSecondIntro] = useState(false)
  const [showStars, setShowStars] = useState(false)

  const handleStart = () => {
    setPhase("intro")
  }

  useEffect(() => {
    if (phase !== "intro") return

    // Show second intro text after 2 seconds
    const timer1 = setTimeout(() => {
      setShowSecondIntro(true)
    }, 2000)

    // Transition to stars phase after 4 seconds
    const timer2 = setTimeout(() => {
      setPhase("stars")
      setShowStars(true)
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [phase])

  useEffect(() => {
    // Check if all stars are revealed
    if (revealedStars.size === starMessages.length && phase === "stars") {
      const timer = setTimeout(() => {
        setPhase("complete")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [revealedStars, phase])

  const handleStarReveal = (index: number) => {
    setRevealedStars((prev) => new Set([...prev, index]))
  }

  const handleForgive = () => {
    setPhase("forgiven")
  }

  const handleNeedTime = () => {
    setPhase("needtime")
  }

  const allStarsRevealed = revealedStars.size === starMessages.length

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0F1729] via-[#0A0F1F] to-[#050810]">
      {/* Background music */}
      <BackgroundMusic />

      {/* Twinkling background stars */}
      <TwinklingStars />

      {/* Heart particles when forgiven */}
      {phase === "forgiven" && <HeartParticles />}

      {/* Moon - centered */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Moon isGlowing={allStarsRevealed || phase === "forgiven"} />
        </motion.div>
      </div>

      {/* Interactive Stars - only show during stars phase */}
      <AnimatePresence>
        {showStars && phase === "stars" && (
          <motion.div 
            className="fixed inset-0 z-30"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {starMessages.map((star, index) => (
              <InteractiveStar
                key={index}
                message={star.message}
                position={star.position}
                delay={index * 0.3}
                onReveal={() => handleStarReveal(index)}
                isRevealed={revealedStars.has(index)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content overlay - lower z-index so stars are clickable */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          {/* Start phase */}
          {phase === "start" && (
            <motion.div
              key="start"
              className="text-center space-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <h1 className="text-3xl sm:text-4xl font-light text-slate-200 tracking-wide">
                  A Message For You
                </h1>
                <p className="text-slate-500 text-sm">Under the stars</p>
              </motion.div>

              <motion.button
                onClick={handleStart}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 font-medium text-lg border border-slate-600/50 shadow-xl shadow-slate-900/50 hover:from-slate-700 hover:to-slate-600 active:scale-95 transition-all duration-300 pointer-events-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin
              </motion.button>
            </motion.div>
          )}

          {/* Intro phase */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              className="text-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-2xl md:text-4xl font-light text-slate-200 tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                Tonight I wanted to tell you something...
              </motion.h1>

              <AnimatePresence>
                {showSecondIntro && (
                  <motion.p
                    className="text-lg md:text-xl text-slate-400 font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    Click the stars to hear my heart.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Stars phase - show instruction */}
          {phase === "stars" && !allStarsRevealed && (
            <motion.div
              key="stars-hint"
              className="absolute bottom-12 left-0 right-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
            >
              <p className="text-sm text-slate-500">
                {revealedStars.size} of {starMessages.length} stars revealed
              </p>
            </motion.div>
          )}

          {/* Complete phase - show message and buttons in a glass card */}
          {(phase === "complete") && (
            <motion.div
              key="complete"
              className="flex items-center justify-center w-full px-4 mt-16 sm:mt-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.div
                className="relative w-full max-w-sm bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-slate-900/50"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              >
                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/10 via-transparent to-purple-500/10 rounded-3xl blur-xl pointer-events-none" />
                
                <div className="relative space-y-6 text-center">
                  <motion.p
                    className="text-xl sm:text-2xl text-slate-200 font-light leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    Even the moon knows how much you mean to me.
                  </motion.p>

                  <motion.p
                    className="text-lg sm:text-xl text-slate-400 font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    Can you forgive me?
                  </motion.p>

                  <motion.div
                    className="flex flex-col gap-3 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                  >
                    <motion.button
                      onClick={handleForgive}
                      className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-lg shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 active:scale-95 transition-all duration-300 pointer-events-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Forgive me
                    </motion.button>

                    <motion.button
                      onClick={handleNeedTime}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-800/80 text-slate-300 font-medium text-lg border border-slate-600/50 hover:bg-slate-700/80 active:scale-95 transition-all duration-300 pointer-events-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      I need time
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Forgiven phase */}
          {phase === "forgiven" && (
            <motion.div
              key="forgiven"
              className="flex items-center justify-center w-full px-4 mt-16 sm:mt-24"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.div
                className="relative w-full max-w-sm bg-slate-900/70 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 shadow-2xl shadow-rose-500/20"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              >
                {/* Rose glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 via-pink-500/10 to-rose-500/20 rounded-3xl blur-xl pointer-events-none" />
                
                <div className="relative space-y-6 text-center">
                  <motion.p
                    className="text-xl sm:text-2xl text-rose-200 font-light leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    Thank you for giving my heart another chance.
                  </motion.p>

                  <motion.div
                    className="text-5xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  >
                    💕
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Need time phase */}
          {phase === "needtime" && (
            <motion.div
              key="needtime"
              className="flex items-center justify-center w-full px-4 mt-16 sm:mt-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.div
                className="relative w-full max-w-sm bg-slate-900/70 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-8 shadow-2xl shadow-slate-900/50"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              >
                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-500/10 via-transparent to-slate-500/10 rounded-3xl blur-xl pointer-events-none" />
                
                <div className="relative space-y-6 text-center">
                  <motion.p
                    className="text-xl sm:text-2xl text-slate-200 font-light leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    {"I understand. I'll still be here."}
                  </motion.p>

                  <motion.div
                    className="text-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    🌙
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer credit */}
      <div className="fixed bottom-4 left-0 right-0 z-10 text-center pointer-events-none">
        <p className="text-xs text-slate-600 font-light tracking-wide">
          Made by Umang
        </p>
      </div>
    </main>
  )
}
