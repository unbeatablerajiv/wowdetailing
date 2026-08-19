import Hero from '../components/Hero'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />

      {/* CTA Banner */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-dark-700 via-dark-700 to-dark-700 border border-brand-500/30 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-brand-500/5 to-transparent" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black text-brand-500 mb-4">
                Ready to Transform Your Car?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Book your appointment today and experience the Wow Detailing difference.
              </p>
              <Link to="/booking" className="btn-primary text-base px-10 py-4 glow-amber">
                Book Now — It's Quick <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
