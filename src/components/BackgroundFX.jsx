import { useEffect, useRef } from 'react'

export default function BackgroundFX() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const rafRef = useRef(0)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = canvas.width = window.innerWidth
    let height = canvas.height = Math.max(window.innerHeight, 800)

    const createParticles = () => {
      const count = Math.min(100, Math.floor((width * height) / 25000))
      particlesRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
        a: Math.random() * 0.6 + 0.2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const { x: mx, y: my } = mouseRef.current

      for (const p of particlesRef.current) {
        // simple motion
        p.x += p.vx
        p.y += p.vy
        // wrap
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // mouse parallax attraction
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.hypot(dx, dy) || 1
        const force = Math.min(0.6 / dist, 0.02)
        p.vx += force * (dx / dist)
        p.vy += force * (dy / dist)
        p.vx *= 0.98
        p.vy *= 0.98

        ctx.beginPath()
        ctx.fillStyle = `rgba(180, 160, 255, ${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // soft linking lines
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]
          const b = particlesRef.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < 100) {
            ctx.strokeStyle = `rgba(160, 140, 255, ${0.08 * (1 - d / 100)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.restore()
      rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = Math.max(window.innerHeight, 800)
      createParticles()
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      // parallax orbs
      if (containerRef.current) {
        const cx = (mouseRef.current.x / width - 0.5) * 8
        const cy = (mouseRef.current.y / height - 0.5) * 8
        containerRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      }
    }

    createParticles()
    draw()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full will-change-transform" />
      <div ref={containerRef} className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
    </div>
  )
}
