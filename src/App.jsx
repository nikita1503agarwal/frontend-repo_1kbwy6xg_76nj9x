import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const load = async () => {
    setFetching(true)
    try {
      const res = await fetch(`${API}/api/tasks`)
      const data = await res.json()
      setTasks(data)
    } catch (e) {
      console.error(e)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => { load() }, [])

  const addTask = async (title) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      if (!res.ok) throw new Error('Failed to add task')
      const created = await res.json()
      setTasks((prev) => [created, ...prev])
    } finally {
      setLoading(false)
    }
  }

  const toggleTask = async (task) => {
    const res = await fetch(`${API}/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    })
    if (!res.ok) return
    const updated = await res.json()
    setTasks((prev) => prev.map(t => t.id === updated.id ? updated : t))
  }

  const deleteTask = async (task) => {
    const res = await fetch(`${API}/api/tasks/${task.id}`, { method: 'DELETE' })
    if (res.ok) setTasks((prev) => prev.filter(t => t.id !== task.id))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Hero />

      <main className="-mt-10 md:-mt-14 z-10">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Your Tasks</h2>
              <button
                onClick={load}
                className="text-sm text-gray-500 hover:text-rose-600 transition"
              >
                Refresh
              </button>
            </div>

            <TodoInput onAdd={addTask} loading={loading} />

            <div className="mt-6">
              {fetching ? (
                <div className="text-center text-gray-500 py-8">Loading...</div>
              ) : (
                <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
              )}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Built with a minimalist, modern aesthetic and smooth interactions.
          </p>
        </div>
      </main>
    </div>
  )
}
