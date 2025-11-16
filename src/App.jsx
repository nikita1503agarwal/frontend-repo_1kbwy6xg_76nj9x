import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import BackgroundFX from './components/BackgroundFX'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const stats = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter(t => t.completed).length
    const active = total - done
    return { total, done, active }
  }, [tasks])

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
    <div className="min-h-screen relative">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-20%,rgba(160,120,255,0.35),transparent_60%),radial-gradient(1200px_600px_at_110%_0%,rgba(255,120,200,0.35),transparent_60%),linear-gradient(180deg,#0f0b22_0%,#151028_35%,#0b0a16_100%)]"></div>
      <BackgroundFX />

      <div className="relative z-10 flex flex-col min-h-screen text-white">
        <Hero stats={stats} onRefresh={load} />

        <main className="-mt-14 md:-mt-24 z-10">
          <div className="max-w-3xl mx-auto px-6">
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-white/90">Your Tasks</h2>
                <button
                  onClick={load}
                  className="text-sm text-white/50 hover:text-white/90 transition relative group"
                >
                  <span className="pr-6">Refresh</span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-tr from-fuchsia-400 to-violet-400 blur-sm opacity-0 group-hover:opacity-100 transition" />
                </button>
              </div>

              <TodoInput onAdd={addTask} loading={loading} />

              <div className="mt-6">
                {fetching ? (
                  <div className="space-y-3">
                    <div className="skeleton h-12 rounded-xl" />
                    <div className="skeleton h-12 rounded-xl" />
                    <div className="skeleton h-12 rounded-xl" />
                  </div>
                ) : (
                  <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
                )}
              </div>
            </div>

            <p className="text-center text-xs text-white/40 mt-6">
              Crafted for calm productivity with premium motion.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
