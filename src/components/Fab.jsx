import { motion } from 'framer-motion'

export default function Fab({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      title="Write a poem"
      whileHover={{ scale: 1.15, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: 30,
        left: 30,
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ff6b9d, #ee5a89)',
        border: 'none',
        color: 'white',
        fontSize: '1.8rem',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(255, 107, 157, 0.5)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      +
    </motion.button>
  )
}
