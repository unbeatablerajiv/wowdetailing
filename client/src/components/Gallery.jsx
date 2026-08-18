import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const comparisons = [
  {
    title: 'Exterior Restoration',
    description: 'A complete exterior detail, bringing depth, clarity and showroom-level gloss back to the paintwork.',
    before: '/showcase/honda-4.jpeg',
    after: '/showcase/honda-1.jpeg',
    alt: 'Honda Civic exterior restoration before and after detailing',
  },
  {
    title: 'Paint Correction & Gloss',
    description: 'Careful paint refinement and finishing for cleaner reflections, richer colour and a premium final finish.',
    before: '/showcase/honda-3.jpeg',
    after: '/showcase/honda-6.jpeg',
    alt: 'Honda Civic paint correction before and after detailing',
  },
  {
    title: 'Front Bumper Revival',
    description: 'Targeted exterior restoration to bring a cleaner, more refined finish back to high-impact areas.',
    before: '/showcase/skoda-4.jpg',
    after: '/showcase/skoda-6.jpg',
    alt: 'Honda Civic front bumper restoration before and after detailing',
  },
  {
    title: 'Rear Finish Revival',
    description: 'Thorough surface preparation and finishing to restore a crisp, cared-for appearance.',
    before: '/showcase/skoda-3.jpg',
    after: '/showcase/skoda-5.jpg',
    alt: 'Honda Civic rear finish restoration before and after detailing',
  },
]

function ComparisonSlider({ comparison }) {
  const [position, setPosition] = useState(50)

  return (
    <article className="overflow-hidden rounded-2xl border border-dark-500 bg-dark-700 shadow-sm">
      <div className="relative aspect-[4/5] overflow-hidden bg-dark-600 select-none">
        <img src={comparison.after} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <img
          src={comparison.before}
          alt={comparison.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-xs font-bold text-white">Before</span>
        <span className="absolute right-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">After</span>
        <div className="absolute bottom-0 top-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-800 shadow-lg">
            <ChevronLeft size={16} /><ChevronRight size={16} />
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Compare before and after: ${comparison.title}`}
          className="absolute inset-0 h-full w-full cursor-col-resize opacity-0"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy-800">{comparison.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{comparison.description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-500">Drag to reveal the result</p>
      </div>
    </article>
  )
}

export default function Gallery() {
  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Our Work</span>
          <h2 className="section-heading mt-2">See the WOW Difference</h2>
          <p className="section-subheading mx-auto mt-4">
            Drag the slider to see how our detailing techniques transform every finish.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {comparisons.map((comparison) => <ComparisonSlider key={comparison.title} comparison={comparison} />)}
        </div>

        <div className="mt-16">
          <div className="text-center mb-8">
            <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Behind the Craft</span>
            <h3 className="mt-2 text-3xl font-bold text-navy-800">Precision in Every Detail</h3>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              From careful paint-protection-film installation to meticulous finishing, every vehicle is handled with focus and care.
            </p>
          </div>

          <div className="grid max-w-4xl mx-auto gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
              <img
                src="/showcase/bmw-z4-ppf.png"
                alt="WOW detailing team applying paint protection film to a BMW Z4"
                className="aspect-[9/16] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="p-5 text-center font-semibold text-navy-800">Precision PPF application</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
              <img
                src="/showcase/bmw-x5-ppf.png"
                alt="Detailer carefully installing paint protection film on a BMW X5"
                className="aspect-[9/16] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="p-5 text-center font-semibold text-navy-800">Meticulous film installation</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
