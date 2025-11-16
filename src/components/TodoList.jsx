import { useEffect, useRef } from 'react'

function TaskItem({ t, onToggle, onDelete, index }) {
  const liRef = useRef(null)

  useEffect(() => {
    // staggered entrance
    const el = liRef.current
    if (!el) return
    el.animate([
      { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], { duration: 420, delay: index * 50, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' })
  }, [index])

  const toggle = () => onToggle(t)
  const remove = () => {
    const el = liRef.current
    if (!el) return onDelete(t)
    // slide-out + fade
    const anim = el.animate([
      { opacity: 1, transform: 'translateX(0)' },
      { opacity: 0, transform: 'translateX(8px)' }
    ], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' })
    anim.onfinish = () => onDelete(t)
  }

  return (
    <li ref={liRef} className="task-row group">
      <button onClick={toggle} className="check-btn" aria-pressed={t.completed} aria-label={t.completed ? 'Mark as incomplete' : 'Mark as complete'}>
        <svg className="check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" className="ring" /><path d="M7 12.5l3.2 3.2L17.5 8.4" className="mark" /></svg>
      </button>
      <div className={`flex-1 min-w-0 ${t.completed ? 'line-through text-white/40' : 'text-white/90'}`}>
        <div className="truncate">{t.title}</div>
        <div className="text-[11px] text-white/30 mt-0.5">{new Date(t.updated_at || t.created_at || Date.now()).toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="priority badge priority-low">Low</span>
        <button onClick={remove} className="icon-btn" aria-label="Delete task">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
        </button>
      </div>
    </li>
  )
}

export default function TodoList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B794FF"/>
              <stop offset="100%" stopColor="#FF7ACB"/>
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="52" stroke="url(#g)" strokeOpacity="0.4" strokeWidth="2" />
          <path d="M40 64l12 12L80 48" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="mt-3 text-white/70">No tasks yet. Craft your first premium task above.</div>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-white/5">
      {tasks.map((t, i) => (
        <TaskItem key={t.id} t={t} index={i} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
