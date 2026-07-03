import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Clock } from 'lucide-react'

const stats = [
  { icon: Star, value: '500+', label: 'Happy Clients' },
  { icon: Shield, value: '5★', label: 'Average Rating' },
  { icon: Clock, value: '8+', label: 'Years Experience' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — keeps dark navy for dramatic contrast */}
      <div className="absolute inset-0 bg-navy-900">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent" />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-navy-800/80 border border-brand-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-brand-300 text-sm font-medium">Premium Car Detailing Studio</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Your Car Deserves</span>
            <br />
            <span className="text-gradient">The Best Care</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Professional detailing that transforms your vehicle from ordinary to extraordinary.
            Using only premium-grade products and proven techniques.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/booking" className="btn-primary text-base px-8 py-4">
              Book Your Detail
              <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="btn-outline text-base px-8 py-4">
              View Services
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <Icon size={18} className="text-brand-500" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">{value}</div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
