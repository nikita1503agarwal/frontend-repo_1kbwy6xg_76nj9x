import { useEffect, useRef, useState } from 'react'

export default function TodoInput({ onAdd, loading }) {
  const [title, setTitle] = useState('')
  const btnRef = useRef(null)
  const rippleRef = useRef(null)

  const submit = async (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    await onAdd(trimmed)
    setTitle('')
    // trigger haptic-like visual pulse
    pulse()
  }

  const pulse = () => {
    const el = btnRef.current
    if (!el) return
    el.animate([
      { transform: 'translateZ(0) scale(1)', filter: 'brightness(1)' },
      { transform: 'translateZ(0) scale(0.97)', filter: 'brightness(1.1)' },
      { transform: 'translateZ(0) scale(1)', filter: 'brightness(1)' }
    ], { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' })
  }

  const addRipple = (e) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const circle = document.createElement('span')
    const d = Math.max(rect.width, rect.height)
    circle.style.width = circle.style.height = `${d}px`
    circle.style.left = `${e.clientX - rect.left - d / 2}px`
    circle.style.top = `${e.clientY - rect.top - d / 2}px`
    circle.className = 'ripple'
    button.appendChild(circle)
    setTimeout(() => circle.remove(), 500)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        const trimmed = title.trim()
        if (trimmed) onAdd(trimmed).then(() => setTitle(''))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [title, onAdd])

  return (
    <form onSubmit={submit} className="flex gap-2">
      <div className="relative flex-1 group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a premium task…"
          aria-label="Add a new task"
          className="floating-input"
        />
        <div className="input-glow" />
      </div>
      <button
        type="submit"
        disabled={loading}
        ref={btnRef}
        onClick={addRipple}
        className="premium-btn"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  )
}
