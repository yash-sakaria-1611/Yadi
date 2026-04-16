import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function NoteCard({ note, onDelete, index }) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        layout
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{note.title}</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span
              className={`priority-${note.priority}`}
              style={{ padding: '4px 14px', borderRadius: 20, fontSize: '0.73rem', fontWeight: 600, textTransform: 'capitalize' }}
            >
              {note.priority}
            </span>
            <span style={{
              fontSize: '0.83rem', color: 'var(--accent-light)',
              background: 'rgba(255,107,157,0.12)', padding: '4px 14px',
              borderRadius: 20, border: '1px solid rgba(255,107,157,0.25)'
            }}>
              📅 {formatDate(note.date)}
            </span>
          </div>
        </div>
        <div style={{ fontSize: '0.98rem', lineHeight: 1.75, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
          {note.content}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>🗑️ Remove</button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showConfirm && (
          <Modal
            title="🗑️ Remove this note?"
            message="This can't be undone."
            onConfirm={() => { onDelete(note.id); setShowConfirm(false) }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
