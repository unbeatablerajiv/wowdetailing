import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'James T.',
    vehicle: 'BMW M4',
    rating: 5,
    text: "Absolutely mind-blowing results. My M4 looks better than it did walking out of the dealership. The team's attention to detail is second to none — every panel, every crevice, spotless.",
    avatar: 'JT',
  },
  {
    id: 2,
    name: 'Sarah M.',
    vehicle: 'Toyota RAV4',
    rating: 5,
    text: "I booked the Interior Detail after my dog destroyed the back seat. I honestly couldn't believe the transformation. Smells fresh, looks brand new. Will be a regular customer from now on.",
    avatar: 'SM',
  },
  {
    id: 3,
    name: 'David K.',
    vehicle: 'Porsche Cayenne',
    rating: 5,
    text: "Premium Package was 100% worth it. The paint correction has removed years of swirl marks and the ceramic prep left the finish glass-smooth. Professional outfit from booking to handover.",
    avatar: 'DK',
  },
  {
    id: 4,
    name: 'Priya R.',
    vehicle: 'Tesla Model 3',
    rating: 5,
    text: "Easy online booking, showed up on time, great communication throughout. The Essential Wash left my Model 3 looking stunning. Quick and affordable for a weekly top-up.",
    avatar: 'PR',
  },
  {
    id: 5,
    name: 'Marcus L.',
    vehicle: 'Ford F-150',
    rating: 5,
    text: "Work truck that needed serious love. Full Detail brought it back to life — even the engine bay. These guys really do go the extra mile. Booked for next month already.",
    avatar: 'ML',
  },
  {
    id: 6,
    name: 'Emma W.',
    vehicle: 'Mercedes GLC',
    rating: 5,
    text: "Gifted a Full Detail to my husband for his birthday. He cried (happy tears). The team even left a little note and treated the car with genuine care. Highly recommended.",
    avatar: 'EW',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-brand-500 fill-brand-500" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Reviews</span>
          <h2 className="section-heading mt-2">What Our Clients Say</h2>
          <p className="section-subheading mx-auto mt-4">
            Over 500 five-star reviews and counting. Real customers, real results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-dark-500 rounded-2xl p-6 hover:border-brand-500/40 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <Quote size={28} className="text-brand-500/30 mb-3" />
              <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">"{t.text}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-dark-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-500 font-bold text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-navy-800 font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.vehicle}</div>
                  </div>
                </div>
                <Stars count={t.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
