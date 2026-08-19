import Gallery from '../components/Gallery'

export default function WorkPage() {
  return (
    <main className="pt-20">
      <section className="bg-white pb-2 pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Featured Work</span>
            <h1 className="mt-2 text-3xl font-bold text-navy-800 sm:text-4xl">Featured Transformation</h1>
          </div>
          <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-2xl border border-dark-500 bg-dark-900 shadow-xl">
            <iframe
              title="WOW Detailing featured work video"
              src="https://drive.google.com/file/d/1X-wLT2Urffk1qUmfrIhKco6A7ZMhRECS/preview"
              className="h-[480px] w-full border-0 sm:h-[580px]"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      <Gallery />
    </main>
  )
}
