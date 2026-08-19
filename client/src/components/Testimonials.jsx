import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Pankaj Kumar Sinha',
    vehicle: 'Innova HyCross & Honda City Hybrid · PPF',
    rating: 5,
    text: 'The precision of PPF application, flawless finish and attention to detail significantly enhanced the appearance and protection of both my vehicles.',
    avatar: 'PK',
  },
  {
    id: 2,
    name: 'Anup Toppo',
    vehicle: 'Hyundai Verna · Graphene Matrix Coating',
    rating: 5,
    text: 'Recently got my Verna Graphene Matrix coated from WOW Detailing—an amazing experience. Prompt service, skilled staff and amazing quality of work.',
    avatar: 'AT',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    vehicle: 'Scratch Restoration',
    rating: 5,
    text: 'My vehicle was completely revamped even after having a lot of scratches. Everyone in the family was happy once it was done!',
    avatar: 'AK',
  },
  {
    id: 4,
    name: 'Nikhil Singh',
    vehicle: 'Škoda Yeti · Full Detailing',
    rating: 5,
    text: 'Great work on my 11-year-old Škoda Yeti. The attention to detail was amazing; staff were professional and courteous, and I’ll be visiting again.',
    avatar: 'NS',
  },
  {
    id: 5,
    name: 'Anshuman Raj',
    vehicle: 'Hyundai Venue SX · PPF',
    rating: 5,
    text: 'Gave my Venue SX for PPF installation. The service is just WOW! Each and every finish is done precisely. Highly recommended if you love your car.',
    avatar: 'AR',
  },
  {
    id: 6,
    name: 'Anish Minz',
    vehicle: 'Mahindra Thar ROXX · PPF',
    rating: 5,
    text: 'I got my Thar ROXX PPF’ed from WOW and I’m highly satisfied with their work, behaviour and team management. They make you feel like home.',
    avatar: 'AM',
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
            Real five-star experiences from WOW customers.
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
