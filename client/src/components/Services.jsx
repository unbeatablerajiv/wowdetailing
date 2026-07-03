import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Shield, Layers, Droplets } from 'lucide-react'

const services = [
  {
    id: 1,
    icon: Droplets,
    name: 'Bath',
    startingFrom: 250,
    tagline: 'Quick wash to deep silica shine.',
    description: 'Three wash tiers — Aqua, Bubble, and Silica Bath. Priced by vehicle type and size. Perfect for regular maintenance.',
    highlights: ['Aqua Bath · Bubble Bath · Silica Bath', 'Hatchback / Sedan / SUV', 'Sizes S · M · L · XL'],
    cta: 'See Bath Prices',
    featured: false,
  },
  {
    id: 2,
    icon: Sparkles,
    name: 'Detailing',
    startingFrom: 4500,
    tagline: 'Hand-finished inside and out.',
    description: 'Standard and Premium detailing tiers. Standard from ₹4,500, Premium (flat 50% off) from ₹7,500 — priced by vehicle type and size.',
    highlights: ['Standard & Premium tiers', 'Interior + Exterior coverage', 'Flat 50% off on Premium'],
    cta: 'See Detailing Prices',
    featured: true,
  },
  {
    id: 3,
    icon: Shield,
    name: 'Ceramic Coating',
    startingFrom: 12500,
    tagline: 'Long-lasting paint protection.',
    description: 'Standard ceramic (9H, 10H, Diamond) and Ceramic & Graphene (40% off) options. Warranty up to 7 years, shelf life up to 10 years.',
    highlights: ['9H · 10H · Diamond · Graphene', 'Warranty up to 7 years', 'Flat 40% off on Graphene range'],
    cta: 'See Coating Prices',
    featured: false,
  },
  {
    id: 4,
    icon: Layers,
    name: 'Paint Protection Film',
    startingFrom: 38500,
    tagline: 'TPU film — the ultimate shield.',
    description: 'Five PPF tiers from WOW Gloss Shield to Tough Pro Shield. Warranty up to 12 years, shelf life up to 15 years. Available for all vehicle sizes.',
    highlights: ['Gloss · Advance · Pro · Tough · Tough Pro', 'Warranty up to 12 years', 'Full-body TPU application'],
    cta: 'See PPF Prices',
    featured: false,
  },
]

export default function Services() {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="section-heading mt-2">
            Protection for Every Budget
          </h2>
          <p className="section-subheading mx-auto mt-4">
            From a quick bath to full paint protection film — four service categories,
            each with pricing tailored to your vehicle type and size.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  service.featured
                    ? 'border-brand-500 bg-gradient-to-b from-brand-50 to-white shadow-lg shadow-brand-500/10'
                    : 'border-dark-500 bg-white hover:border-brand-500/40 shadow-sm'
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  service.featured ? 'bg-brand-500/10 text-brand-500' : 'bg-dark-600 text-gray-500'
                }`}>
                  <Icon size={18} />
                </div>

                <div className="mb-3">
                  <h3 className="text-navy-800 font-bold text-xl">{service.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{service.tagline}</p>
                </div>

                <div className="mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Starting from</span>
                  <div className="text-brand-500 font-black text-3xl mt-0.5">
                    ₹{service.startingFrom.toLocaleString('en-IN')}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">{service.description}</p>

                <ul className="space-y-1.5 mb-6">
                  {service.highlights.map((h) => (
                    <li key={h} className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/services"
                  className={`w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    service.featured
                      ? 'bg-brand-500 text-white hover:bg-brand-600'
                      : 'border border-dark-500 text-navy-700 hover:border-brand-500 hover:text-brand-500'
                  }`}
                >
                  {service.cta}
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 font-medium text-sm transition-colors">
            View full pricing & details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
