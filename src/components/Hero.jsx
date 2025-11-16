import Spline from '@splinetool/react-spline'

export default function Hero({ stats, onRefresh }) {
  return (
    <section className="relative w-full h-[48vh] md:h-[56vh] lg:h-[64vh] overflow-hidden">
      {/* Spline layer */}
      <div className="absolute inset-0 opacity-90">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Overlay gradients for luxury depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0b22]/40 to-[#0b0a16]" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_6px_30px_rgba(140,120,255,0.35)]">
            Luxe To‑Do Experience
          </h1>
          <p className="mt-3 md:mt-4 text-white/70 max-w-xl mx-auto">
            Elegant glass surfaces, fluid motion, and mindful focus. Add tasks and watch the interface respond with premium micro‑interactions.
          </p>

          {/* Stats bar */}
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto">
            {[
              { label: 'Total', value: stats.total },
              { label: 'Active', value: stats.active },
              { label: 'Done', value: stats.done }
            ].map((s, i) => (
              <div key={s.label} className="stat-card">
                <div className="relative">
                  <span className="text-[11px] uppercase tracking-wide text-white/60">{s.label}</span>
                  <div className="mt-1 text-2xl font-semibold tabular-nums" aria-live="polite">{s.value}</div>
                  <div className={`stat-glow delay-${i*75}`} />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onRefresh}
            className="mt-5 inline-flex items-center gap-2 premium-btn"
          >
            <span>Refresh Data</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10"/><path d="M1 14l5.37 4.37A9 9 0 0 0 20.49 15"/></svg>
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/0 to-[#0b0a16]" />
    </section>
  )
}
