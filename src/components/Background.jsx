import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const HEARTS = ['💕', '💗', '💖', '✨', '🌸', '💜', '🤍', '🦋']

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function Background() {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    for (let i = 0; i < 18; i++) {
      const heart = document.createElement('span')
      heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)]
      heart.className = 'bg-floating-heart'
      heart.style.left = `${Math.random() * 100}%`
      heart.style.fontSize = `${randomBetween(12, 24)}px`
      heart.style.animationDuration = `${randomBetween(10, 22)}s`
      heart.style.animationDelay = `${randomBetween(0, 15)}s`
      el.appendChild(heart)
    }

    for (let i = 0; i < 35; i++) {
      const spark = document.createElement('span')
      spark.className = 'bg-sparkle'
      spark.style.left = `${Math.random() * 100}%`
      spark.style.top = `${Math.random() * 100}%`
      spark.style.animationDelay = `${randomBetween(0, 6)}s`
      spark.style.animationDuration = `${randomBetween(2, 5)}s`
      el.appendChild(spark)
    }
  }, [])

  return (
    <div className="bg-animation" ref={containerRef}>
      <motion.div
        className="bg-orb bg-orb-1"
        animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-orb bg-orb-2"
        animate={{ x: [0, -25, 35, 0], y: [0, 25, -15, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-orb bg-orb-3"
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 25, 0], scale: [1, 1.1, 0.85, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <style>{`
        .bg-animation {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .bg-orb-1 { width: 320px; height: 320px; background: rgba(255, 107, 157, 0.25); top: 8%; left: 8%; }
        .bg-orb-2 { width: 400px; height: 400px; background: rgba(107, 157, 255, 0.18); top: 50%; right: 3%; }
        .bg-orb-3 { width: 260px; height: 260px; background: rgba(255, 200, 107, 0.18); bottom: 8%; left: 28%; }
        .bg-floating-heart {
          position: absolute;
          opacity: 0;
          animation: bgFloatUp linear infinite;
        }
        @keyframes bgFloatUp {
          0%   { transform: translateY(100vh) rotate(0deg) scale(0.5); opacity: 0; }
          10%  { opacity: 0.55; }
          85%  { opacity: 0.25; }
          100% { transform: translateY(-10vh) rotate(720deg) scale(1.2); opacity: 0; }
        }
        .bg-sparkle {
          position: absolute;
          width: 3px; height: 3px;
          background: white;
          border-radius: 50%;
          animation: bgSparkle ease-in-out infinite;
        }
        @keyframes bgSparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50%      { opacity: 0.9; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
