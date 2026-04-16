import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h1 className="header-title">Yadi</h1>
      <motion.div
        className="header-heart"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        💕
      </motion.div>
      <p className="header-subtitle">A little space for us, Disha ✨</p>

      <style>{`
        .header {
          text-align: center;
          padding: 40px 20px 28px;
        }
        .header-title {
          font-family: 'Dancing Script', cursive;
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ff6b9d, #ffa5c3, #ffcce0, #ffa5c3, #ff6b9d);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .header-heart {
          font-size: 1.5rem;
          margin: 10px 0;
        }
        .header-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: var(--text-secondary);
          letter-spacing: 2px;
        }
        @media (max-width: 600px) {
          .header-title { font-size: 2.5rem; }
        }
      `}</style>
    </motion.header>
  )
}
