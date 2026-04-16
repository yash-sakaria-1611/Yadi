import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ toasts }) {
  return (
    <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              padding: '14px 24px',
              borderRadius: 16,
              background: 'rgba(255, 107, 157, 0.9)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              fontWeight: 500,
              marginTop: 10,
              boxShadow: '0 8px 32px rgba(255, 107, 157, 0.4)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
            }}
          >
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
