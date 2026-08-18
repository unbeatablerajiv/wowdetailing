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

const workshopGallery = [
  { src: '/showcase/black-fortuner.jpg', label: 'Paint correction in progress', alt: 'Detailer polishing a vehicle hood at WOW Detailing' },
  { src: '/showcase/bmw-z4.jpg', label: 'BMW Z4 PPF installation', alt: 'WOW Detailing team installing paint protection film on a BMW Z4' },
  { src: '/showcase/bmw-x5-ppf.jpg', label: 'BMW X5 PPF application', alt: 'Detailer applying paint protection film to a BMW X5' },
  { src: '/showcase/creta-wow.jpg', label: 'Creta paintwork refinement', alt: 'Hyundai Creta receiving precision paintwork refinement' },
  { src: '/showcase/tata-sierra.jpg', label: 'Paint correction in action', alt: 'WOW Detailing technician polishing a yellow Tata Sierra' },
  { src: '/showcase/civic-full.jpg', label: 'Honda Civic matte transformation', alt: 'Honda Civic after a professional matte transformation' },
  { src: '/showcase/fortuner-detail.jpg', label: 'Fortuner protection preparation', alt: 'Toyota Fortuner being prepared for professional protection at WOW Detailing' },
  { src: '/showcase/baleno-ceramic.jpg', label: 'Ceramic coating finish', alt: 'Vehicle with a fresh ceramic-coating finish' },
  { src: '/showcase/continental-gt.jpg', label: 'Continental GT studio finish', alt: 'Royal Enfield Continental GT with a premium studio finish' },
  { src: '/showcase/ducati-xdiavel.jpg', label: 'Ducati XDiavel foam wash', alt: 'Ducati XDiavel receiving a detailed foam wash' },
]

function ComparisonSlider({ comparison }) {
  const [position, setPosition] = useState(50)

  return (
    <article className="overflow-hidden rounded-2xl border border-dark-500 bg-dark-700 shadow-sm">
      <div className="relative h-[360px] overflow-hidden bg-dark-600 select-none sm:h-[400px]">
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

function WorkshopCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = workshopGallery[activeIndex]

  const showPrevious = () => setActiveIndex((index) => (index - 1 + workshopGallery.length) % workshopGallery.length)
  const showNext = () => setActiveIndex((index) => (index + 1) % workshopGallery.length)

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-2xl bg-dark-900 shadow-xl">
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="h-[360px] w-full object-cover sm:h-[440px]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-6 pb-6 pt-20 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">Workshop Gallery</p>
          <p className="mt-1 text-xl font-bold">{activeImage.label}</p>
        </div>
        <button
          type="button"
          onClick={showPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-navy-800 shadow-lg transition hover:bg-brand-500 hover:text-white"
          aria-label="Show previous gallery image"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={showNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-navy-800 shadow-lg transition hover:bg-brand-500 hover:text-white"
          aria-label="Show next gallery image"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-500">{String(activeIndex + 1).padStart(2, '0')} / {String(workshopGallery.length).padStart(2, '0')}</p>
        <div className="flex gap-2" aria-label="Select a gallery image">
          {workshopGallery.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-brand-500' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Show image ${index + 1}: ${image.label}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
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

          <WorkshopCarousel />
        </div>
      </div>
    </section>
  )
}
