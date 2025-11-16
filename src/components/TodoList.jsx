import { CheckCircle2, Circle, Trash2 } from 'lucide-react'

export default function TodoList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="text-center text-gray-500 py-8">No tasks yet. Add your first one above!</div>
    )
  }

  return (
    <ul className="divide-y divide-gray-100">
      {tasks.map((t) => (
        <li key={t.id} className="flex items-center justify-between py-3">
          <button
            onClick={() => onToggle(t)}
            className="flex items-center gap-3 group"
          >
            {t.completed ? (
              <CheckCircle2 className="h-6 w-6 text-rose-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400 group-hover:text-rose-400 transition-colors" />
            )}
            <span className={`text-sm md:text-base ${t.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {t.title}
            </span>
          </button>
          <button
            onClick={() => onDelete(t)}
            className="p-2 rounded-md hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition"
            aria-label="Delete task"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  )
}
