import { ShieldCheck, Leaf, Award, Clock, Wrench, MapPin } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Certified Technicians',
    description: 'Our team holds industry certifications and undergoes regular training to stay at the top of their craft.',
  },
  {
    icon: ShieldCheck,
    title: '100% Satisfaction',
    description: "Not happy? We'll redo it free of charge. Your satisfaction is our only measure of success.",
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'We use biodegradable, pH-neutral cleaners that are safe for your car, your family, and the environment.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We respect your time. Your vehicle will be ready within the quoted timeframe, always.',
  },
  {
    icon: Wrench,
    title: 'Premium Equipment',
    description: 'Professional polishers, steam cleaners, and industry-grade products — not consumer-grade shortcuts.',
  },
  {
    icon: MapPin,
    title: 'Mobile Service',
    description: "Can't come to us? We come to you. Mobile detailing available within 30km of our studio.",
  },
]

export default function WhyUs() {
  return (
    <section className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
            <h2 className="section-heading mt-2">
              The Standard Others
              <br />
              <span className="text-gradient">Aspire To</span>
            </h2>
            <p className="text-gray-600 text-lg mt-4 leading-relaxed">
              We treat every vehicle like it's our own. Meticulous attention to detail, premium products, and a team
              that genuinely cares about the outcome sets us apart.
            </p>

            <div className="mt-8 p-6 bg-white border border-dark-500 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-500/10 border border-brand-500/30 rounded-xl flex items-center justify-center shrink-0">
                  <Award size={24} className="text-brand-500" />
                </div>
                <div>
                  <div className="text-navy-800 font-bold">Voted #1 Detailing Studio</div>
                  <div className="text-gray-500 text-sm mt-0.5">North India's Choice</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-5 bg-white border border-dark-500 rounded-xl hover:border-brand-500/40 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-brand-500/20 transition-colors">
                  <Icon size={18} className="text-brand-500" />
                </div>
                <h4 className="text-navy-800 font-semibold text-sm mb-1.5">{title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
