import { motion } from 'framer-motion'

const TABS = [
  { id: 'poems',     icon: '📝', label: 'Poems' },
  { id: 'write',     icon: '✍️', label: 'Write' },
  { id: 'notes',     icon: '💌', label: 'Notes' },
  { id: 'add-note',  icon: '📌', label: 'Add Note' },
  { id: 'dashboard', icon: '🌟', label: 'Us' },
]

export default function Navigation({ tab, setTab }) {
  return (
    <nav className="nav-tabs">
      {TABS.map(t => (
        <motion.button
          key={t.id}
          className={`nav-tab ${tab === t.id ? 'active' : ''}`}
          onClick={() => setTab(t.id)}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.icon} {t.label}
        </motion.button>
      ))}

      <style>{`
        .nav-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .nav-tab {
          padding: 11px 24px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          transition: background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s;
          letter-spacing: 0.5px;
        }
        .nav-tab:hover {
          background: rgba(255, 107, 157, 0.15);
          border-color: var(--accent);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.25);
        }
        .nav-tab.active {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.35), rgba(255, 165, 195, 0.25));
          border-color: var(--accent);
          color: white;
          box-shadow: 0 8px 28px rgba(255, 107, 157, 0.35);
        }
        @media (max-width: 600px) {
          .nav-tab { padding: 9px 16px; font-size: 0.82rem; }
        }
      `}</style>
    </nav>
  )
}
