import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function PoemCard({ poem, onDelete, onLike, index }) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <motion.div
        className="glass-card poem-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        layout
      >
        <div className="poem-header">
          <span className="poem-title">{poem.title}</span>
          <div className="poem-meta">
            {poem.tag && <span className="poem-tag">{poem.tag}</span>}
            <span className="poem-date">📅 {formatDate(poem.date)}</span>
          </div>
        </div>

        <div className="poem-body">{poem.content}</div>
        <div className="poem-author">— {poem.author || 'Anonymous'}</div>

        <div className="poem-actions">
          <motion.button
            className={`like-btn ${poem.liked ? 'liked' : ''}`}
            onClick={() => onLike(poem.id)}
            whileTap={{ scale: 1.35 }}
          >
            {poem.liked ? '❤️ Loved' : '🤍 Love this'}
          </motion.button>
          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>🗑️ Remove</button>
        </div>

        <style>{`
          .poem-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 10px; }
          .poem-title { font-family: 'Playfair Display', serif; font-size: 1.45rem; font-weight: 700; }
          .poem-meta { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
          .poem-date { font-size: 0.83rem; color: var(--accent-light); background: rgba(255, 107, 157, 0.12); padding: 4px 14px; border-radius: 20px; border: 1px solid rgba(255, 107, 157, 0.25); }
          .poem-tag { font-size: 0.75rem; padding: 4px 12px; border-radius: 20px; background: rgba(107, 157, 255, 0.12); border: 1px solid rgba(107, 157, 255, 0.25); color: #a0c4ff; }
          .poem-body { font-family: 'Playfair Display', serif; font-size: 1.08rem; line-height: 2; color: var(--text-secondary); white-space: pre-wrap; padding: 18px; background: rgba(0, 0, 0, 0.12); border-radius: var(--radius-md); border-left: 3px solid var(--accent); margin-bottom: 14px; }
          .poem-author { text-align: right; font-family: 'Dancing Script', cursive; font-size: 1.15rem; color: var(--accent-light); }
          .poem-actions { display: flex; gap: 10px; margin-top: 14px; justify-content: flex-end; }
          .like-btn { background: none; border: 1px solid rgba(255, 107, 157, 0.25); border-radius: var(--radius-full); padding: 8px 18px; color: var(--accent-light); cursor: pointer; font-size: 0.88rem; transition: all 0.3s ease; font-family: 'Inter', sans-serif; }
          .like-btn:hover, .like-btn.liked { background: rgba(255, 107, 157, 0.18); border-color: var(--accent); }
        `}</style>
      </motion.div>

      <AnimatePresence>
        {showConfirm && (
          <Modal
            title="🗑️ Remove this poem?"
            message="This can't be undone. The memory will be gone forever."
            onConfirm={() => { onDelete(poem.id); setShowConfirm(false) }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
