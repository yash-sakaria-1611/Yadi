import { useState } from 'react'
import { motion } from 'framer-motion'

const today = () => new Date().toISOString().split('T')[0]

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

export default function PoemForm({ onSave }) {
  const [form, setForm] = useState({ title: '', content: '', author: '', date: today(), tag: '' })

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) return
    onSave({ ...form, date: form.date || today() })
    setForm({ title: '', content: '', author: '', date: today(), tag: '' })
  }

  return (
    <motion.section variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
      <div className="glass-card">
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 24, fontSize: '1.45rem' }}>
          ✨ Write a New Poem
        </h2>
        <div className="form-group">
          <label>Title</label>
          <input className="form-input" placeholder="Give your poem a beautiful name..." value={form.title} onChange={update('title')} />
        </div>
        <div className="form-group">
          <label>The Poem</label>
          <textarea className="form-input" placeholder="Let your heart speak..." value={form.content} onChange={update('content')} />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input className="form-input" placeholder="Who penned this? 💕" value={form.author} onChange={update('author')} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input className="form-input" type="date" value={form.date} onChange={update('date')} />
        </div>
        <div className="form-group">
          <label>Tag / Mood</label>
          <input className="form-input" placeholder="e.g. Love, Missing You, Joy, Anniversary..." value={form.tag} onChange={update('tag')} />
        </div>
        <div className="btn-group">
          <motion.button className="btn btn-primary" onClick={handleSave} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            💕 Save Poem
          </motion.button>
          <button className="btn btn-secondary" onClick={() => setForm({ title: '', content: '', author: '', date: today(), tag: '' })}>
            Clear
          </button>
        </div>
      </div>
    </motion.section>
  )
}
