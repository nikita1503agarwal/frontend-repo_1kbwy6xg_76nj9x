import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[48vh] md:h-[56vh] lg:h-[64vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="backdrop-blur-sm/0 px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
            Minimal, Modern To‑Do
          </h1>
          <p className="mt-3 md:mt-4 text-gray-700 max-w-xl mx-auto">
            Capture tasks, check them off, and stay focused. Smooth, responsive, and delightful to use.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white"></div>
    </section>
  )
}
