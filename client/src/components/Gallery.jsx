import { useState } from 'react'
import { X } from 'lucide-react'

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    alt: 'Red sports car after full detail',
    tag: 'Full Detail',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    alt: 'Luxury coupe exterior polish',
    tag: 'Paint Polish',
    span: '',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    alt: 'Classic car restoration detail',
    tag: 'Classic Restore',
    span: '',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
    alt: 'Interior leather conditioning',
    tag: 'Interior Detail',
    span: '',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    alt: 'Professional hand wash',
    tag: 'Essential Wash',
    span: '',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1520340493335-b83d6b863aee?w=800&q=80',
    alt: 'Premium SUV ceramic coat',
    tag: 'Ceramic Coat',
    span: '',
  },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Our Work</span>
          <h2 className="section-heading mt-2">Results That Speak</h2>
          <p className="section-subheading mx-auto mt-4">
            Every detail, every finish, every shine — captured from our studio.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[200px] lg:auto-rows-[220px]">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${img.span}`}
              onClick={() => setSelected(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 bg-brand-500 text-white text-xs font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                {img.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            onClick={() => setSelected(null)}
          >
            <X size={18} />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl w-full">
            <img
              src={selected.src.replace('w=800', 'w=1200')}
              alt={selected.alt}
              className="w-full rounded-2xl object-cover max-h-[80vh]"
            />
            <p className="text-center text-gray-400 mt-3 text-sm">{selected.alt}</p>
          </div>
        </div>
      )}
    </section>
  )
}
