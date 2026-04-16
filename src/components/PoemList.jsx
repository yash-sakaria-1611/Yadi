import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PoemCard from './PoemCard'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

export default function PoemList({ poems, onDelete, onLike }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState(null)

  const tags = useMemo(() => [...new Set(poems.map(p => p.tag).filter(Boolean))], [poems])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return poems
      .filter(p => {
        const matchQ = !q ||
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          (p.tag || '').toLowerCase().includes(q) ||
          (p.author || '').toLowerCase().includes(q)
        const matchTag = !activeTag || p.tag === activeTag
        return matchQ && matchTag
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [poems, query, activeTag])

  return (
    <motion.section variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search poems by title, content, or tag..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {tags.length > 0 && (
        <div className="tag-filters">
          <button className={`tag-chip ${!activeTag ? 'active' : ''}`} onClick={() => setActiveTag(null)}>All</button>
          {tags.map(t => (
            <button
              key={t}
              className={`tag-chip ${activeTag === t ? 'active' : ''}`}
              onClick={() => setActiveTag(prev => prev === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div className="empty-state" key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              style={{ fontSize: '4rem' }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              📜
            </motion.div>
            <h3>No poems yet</h3>
            <p>Write the first poem for Disha 💕</p>
          </motion.div>
        ) : (
          filtered.map((p, i) => (
            <PoemCard key={p.id} poem={p} index={i} onDelete={onDelete} onLike={onLike} />
          ))
        )}
      </AnimatePresence>
    </motion.section>
  )
}
