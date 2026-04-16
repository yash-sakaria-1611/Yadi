import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import Header from './components/Header'
import Navigation from './components/Navigation'
import PoemList from './components/PoemList'
import PoemForm from './components/PoemForm'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import Dashboard from './components/Dashboard'
import Toast from './components/Toast'
import Fab from './components/Fab'
import useLocalStorage from './hooks/useLocalStorage'
import './App.css'

export default function App() {
  const [tab, setTab] = useState('poems')
  const [poems, setPoems] = useLocalStorage('yadi_poems', [])
  const [notes, setNotes] = useLocalStorage('yadi_notes', [])
  const [toasts, setToasts] = useState([])

  const toast = useCallback((msg) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  const addPoem = (poem) => {
    setPoems(prev => [...prev, { ...poem, id: Date.now(), liked: false, createdAt: new Date().toISOString() }])
    toast('Poem saved with love 💕')
    setTab('poems')
  }

  const addNote = (note) => {
    setNotes(prev => [...prev, { ...note, id: Date.now(), createdAt: new Date().toISOString() }])
    toast('Note saved 📌')
    setTab('notes')
  }

  const deletePoem = (id) => {
    setPoems(prev => prev.filter(p => p.id !== id))
    toast('Poem removed')
  }

  const toggleLike = (id) => {
    setPoems(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p))
  }

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    toast('Note removed')
  }

  return (
    <>
      <Background />
      <div className="app-container">
        <Header />
        <Navigation tab={tab} setTab={setTab} />
        <main className="main-content">
          <AnimatePresence mode="wait">
            {tab === 'poems' && <PoemList key="poems" poems={poems} onDelete={deletePoem} onLike={toggleLike} />}
            {tab === 'write' && <PoemForm key="write" onSave={addPoem} />}
            {tab === 'notes' && <NoteList key="notes" notes={notes} onDelete={deleteNote} />}
            {tab === 'add-note' && <NoteForm key="add-note" onSave={addNote} />}
            {tab === 'dashboard' && <Dashboard key="dashboard" poems={poems} notes={notes} />}
          </AnimatePresence>
        </main>
      </div>
      <Fab onClick={() => setTab('write')} />
      <Toast toasts={toasts} />
    </>
  )
}
