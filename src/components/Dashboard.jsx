import { useMemo } from 'react'
import { motion } from 'framer-motion'
import useLocalStorage from '../hooks/useLocalStorage'

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

export default function Dashboard({ poems, notes }) {
  const [togetherDate, setTogetherDate] = useLocalStorage('yadi_together_date', '')

  const days = useMemo(() => {
    if (!togetherDate) return '—'
    const d = Math.floor((Date.now() - new Date(togetherDate).getTime()) / 86400000)
    return d >= 0 ? d : '—'
  }, [togetherDate])

  const liked = poems.filter(p => p.liked).length

  const recent = useMemo(() => {
    return [
      ...poems.map(p => ({ type: 'poem', title: p.title, date: p.createdAt || p.date })),
      ...notes.map(n => ({ type: 'note', title: n.title, date: n.createdAt || n.date })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8)
  }, [poems, notes])

  const stats = [
    { label: 'Poems', value: poems.length },
    { label: 'Notes', value: notes.length },
    { label: 'Liked', value: liked },
    { label: 'Days Together', value: days },
  ]

  return (
    <motion.section variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card stat-card"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
          >
            <div className="stat-number">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card" style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.7rem', marginBottom: 10, color: 'var(--accent-light)' }}>
          Our Story Began On
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 16 }}>
          Set the date you & Disha started your journey 💕
        </p>
        <input
          type="date"
          className="form-input"
          style={{ maxWidth: 260, margin: '0 auto', textAlign: 'center', display: 'block' }}
          value={togetherDate}
          onChange={e => setTogetherDate(e.target.value)}
        />
      </div>

      <div className="glass-card">
        <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>Recent Activity</h3>
        {recent.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No activity yet</p>
        ) : (
          recent.map((a, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span>{a.type === 'poem' ? '📝' : '📌'} {a.title}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formatDate(a.date)}</span>
            </div>
          ))
        )}
      </div>

      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; margin-bottom: 20px; }
        .stat-card { text-align: center; padding: 22px 16px; }
        .stat-number { font-size: 2rem; font-weight: 700; background: linear-gradient(135deg, var(--accent), var(--accent-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stat-label { font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px; letter-spacing: 1px; text-transform: uppercase; }
      `}</style>
    </motion.section>
  )
}
