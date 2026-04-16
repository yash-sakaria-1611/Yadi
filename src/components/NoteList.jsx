import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NoteCard from './NoteCard'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

export default function NoteList({ notes, onDelete }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return notes
      .filter(n => !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [notes, query])

  return (
    <motion.section variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search notes..." value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div className="empty-state" key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              style={{ fontSize: '4rem' }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              💌
            </motion.div>
            <h3>No notes yet</h3>
            <p>Leave a sweet note for each other 💕</p>
          </motion.div>
        ) : (
          filtered.map((n, i) => <NoteCard key={n.id} note={n} index={i} onDelete={onDelete} />)
        )}
      </AnimatePresence>
    </motion.section>
  )
}
