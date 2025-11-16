import { useState } from 'react'
import { Plus, Loader2 } from 'lucide-react'

export default function TodoInput({ onAdd, loading }) {
  const [title, setTitle] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    await onAdd(trimmed)
    setTitle('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-sm md:text-base shadow-sm outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white px-4 md:px-5 py-3 text-sm md:text-base font-medium shadow-sm transition-colors"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  )
}
