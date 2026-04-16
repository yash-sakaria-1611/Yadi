import { useState } from 'react'
import { motion } from 'framer-motion'

const today = () => new Date().toISOString().split('T')[0]

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

export default function NoteForm({ onSave }) {
  const [form, setForm] = useState({ title: '', content: '', priority: 'medium', date: today() })
  const update = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) return
    onSave({ ...form, date: form.date || today() })
    setForm({ title: '', content: '', priority: 'medium', date: today() })
  }

  return (
    <motion.section variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
      <div className="glass-card">
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 24, fontSize: '1.45rem' }}>
          📌 Add a Note
        </h2>
        <div className="form-group">
          <label>Title</label>
          <input className="form-input" placeholder="What's this about?" value={form.title} onChange={update('title')} />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-input"
            style={{ minHeight: 120, fontFamily: "'Inter', sans-serif", fontSize: '0.95rem' }}
            placeholder="Write your note here..."
            value={form.content}
            onChange={update('content')}
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select className="form-input" value={form.priority} onChange={update('priority')}>
            <option value="low">💚 Low</option>
            <option value="medium">💛 Medium</option>
            <option value="high">❤️ High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input className="form-input" type="date" value={form.date} onChange={update('date')} />
        </div>
        <div className="btn-group">
          <motion.button className="btn btn-primary" onClick={handleSave} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            📌 Save Note
          </motion.button>
          <button className="btn btn-secondary" onClick={() => setForm({ title: '', content: '', priority: 'medium', date: today() })}>
            Clear
          </button>
        </div>
      </div>
    </motion.section>
  )
}
