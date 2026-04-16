import { motion } from 'framer-motion'

export default function Modal({ title, message, onConfirm, onCancel }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="modal-box"
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <h3>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{message}</p>
        <div className="btn-group" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onCancel}>Keep it</button>
          <button className="btn btn-danger" style={{ padding: '12px 24px', fontSize: '0.9rem' }} onClick={onConfirm}>Delete</button>
        </div>
      </motion.div>

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
          z-index: 500;
          display: flex; justify-content: center; align-items: center;
          padding: 20px;
        }
        .modal-box {
          background: rgba(30, 15, 60, 0.95);
          backdrop-filter: blur(30px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 36px;
          max-width: 500px;
          width: 100%;
        }
        .modal-box h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          margin-bottom: 12px;
        }
      `}</style>
    </motion.div>
  )
}
