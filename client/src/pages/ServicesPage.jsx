import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Sparkles, Droplets, Layers, Star } from 'lucide-react'

// ─── Pricing Data ──────────────────────────────────────────────────────────────

const SIZES = ['S', 'M', 'L', 'XL']

const VEHICLE_TYPES = [
  { key: 'hatchback', label: 'Hatchback' },
  { key: 'sedan',     label: 'Sedan'     },
  { key: 'suv',       label: 'SUV'       },
]

const DETAILING_STANDARD = {
  tagline: 'A thorough clean for the everyday driver — hand-finished by our certified technicians.',
  hatchback: { S: 4500,  M: 5500,  L: 6500,  XL: 7500  },
  sedan:     { S: 6500,  M: 7500,  L: 8500,  XL: 9500  },
  suv:       { S: 8500,  M: 9500,  L: 10500, XL: 12500 },
}

const DETAILING_PREMIUM = {
  tagline: 'Our full inside-out detail — concours-level finish at half the price.',
  hatchback: { S: 7500,  M: 9500,  L: 12500, XL: 14500 },
  sedan:     { S: 8500,  M: 10500, L: 14500, XL: 16500 },
  suv:       { S: 9500,  M: 11500, L: 16500, XL: 18500 },
}

const CERAMIC_STANDARD = {
  hatchback: [
    { name: '9H Coating',      warranty: '1 Year',  shelf: '3 Years', prices: { S: 12500, M: 13500, L: 14500, XL: null  } },
    { name: '10H Coating',     warranty: '3 Years', shelf: '5 Years', prices: { S: 17500, M: 18500, L: 19500, XL: null  } },
    { name: 'Diamond Coating', warranty: '5 Years', shelf: '7 Years', prices: { S: 24500, M: 25500, L: 26500, XL: null  } },
  ],
  sedan: [
    { name: '9H Coating',      warranty: '1 Year',  shelf: '3 Years', prices: { S: 15500, M: 17500, L: 20500, XL: 24500 } },
    { name: '10H Coating',     warranty: '3 Years', shelf: '5 Years', prices: { S: 22500, M: 23500, L: 28500, XL: 32500 } },
    { name: 'Diamond Coating', warranty: '5 Years', shelf: '7 Years', prices: { S: 34500, M: 36500, L: 38500, XL: 44500 } },
  ],
  suv: [
    { name: '9H Coating',      warranty: '1 Year',  shelf: '3 Years', prices: { S: 18500, M: 20500, L: 23500, XL: 28500 } },
    { name: '10H Coating',     warranty: '3 Years', shelf: '5 Years', prices: { S: 24500, M: 26500, L: 28500, XL: 34500 } },
    { name: 'Diamond Coating', warranty: '5 Years', shelf: '7 Years', prices: { S: 38500, M: 39500, L: 40500, XL: 48500 } },
  ],
}

const CERAMIC_GRAPHENE = {
  hatchback: [
    { name: '9H Coating',              warranty: '1 Year',  shelf: '3 Years',  prices: { S: 16500, M: 18500, L: 20500, XL: null  } },
    { name: '10H Coating',             warranty: '3 Years', shelf: '5 Years',  prices: { S: 21500, M: 23500, L: 25500, XL: null  } },
    { name: 'Graphene Coating',        warranty: '5 Years', shelf: '7 Years',  prices: { S: 25500, M: 27500, L: 29500, XL: null  } },
    { name: 'Graphene Matrix Coating', warranty: '7 Years', shelf: '10 Years', prices: { S: 39500, M: 43500, L: 47500, XL: null  } },
  ],
  sedan: [
    { name: '9H Coating',              warranty: '1 Year',  shelf: '3 Years',  prices: { S: 30500, M: 34500, L: 38500, XL: 42500 } },
    { name: '10H Coating',             warranty: '3 Years', shelf: '5 Years',  prices: { S: 32500, M: 36500, L: 40500, XL: 44500 } },
    { name: 'Graphene Coating',        warranty: '5 Years', shelf: '7 Years',  prices: { S: 39500, M: 44500, L: 48500, XL: 52500 } },
    { name: 'Graphene Matrix Coating', warranty: '7 Years', shelf: '10 Years', prices: { S: 48500, M: 52500, L: 56500, XL: 60500 } },
  ],
  suv: [
    { name: '9H Coating',              warranty: '1 Year',  shelf: '3 Years',  prices: { S: 32500, M: 36500, L: 40500, XL: 44500 } },
    { name: '10H Coating',             warranty: '3 Years', shelf: '5 Years',  prices: { S: 35500, M: 39500, L: 43500, XL: 47500 } },
    { name: 'Graphene Coating',        warranty: '5 Years', shelf: '7 Years',  prices: { S: 41500, M: 45500, L: 49500, XL: 53500 } },
    { name: 'Graphene Matrix Coating', warranty: '7 Years', shelf: '10 Years', prices: { S: 54500, M: 58500, L: 62500, XL: 68500 } },
  ],
}

const PPF = {
  hatchback: [
    { name: 'WOW Gloss Shield',     warranty: '3 Yrs (Excl. Roof)', shelf: '5 Years',  prices: { S: 38500,  M: 44500,  L: 52500,  XL: null   } },
    { name: 'WOW Advance Shield',   warranty: '5 Years',            shelf: '7 Years',  prices: { S: 56500,  M: 66500,  L: 68500,  XL: null   } },
    { name: 'WOW Pro Shield',       warranty: '7 Years',            shelf: '10 Years', prices: { S: 74500,  M: 88500,  L: 92500,  XL: null   } },
    { name: 'WOW Tough Shield',     warranty: '10 Years',           shelf: '12 Years', prices: { S: 72500,  M: 99500,  L: 124500, XL: null   } },
  ],
  sedan: [
    { name: 'WOW Gloss Shield',     warranty: '3 Yrs (Excl. Roof)', shelf: '5 Years',  prices: { S: 52500,  M: 72500,  L: 82500,  XL: 88500  } },
    { name: 'WOW Advance Shield',   warranty: '5 Years',            shelf: '7 Years',  prices: { S: 74500,  M: 94500,  L: 105500, XL: 122500 } },
    { name: 'WOW Pro Shield',       warranty: '7 Years',            shelf: '10 Years', prices: { S: 98500,  M: 118500, L: 138500, XL: 142500 } },
    { name: 'WOW Tough Shield',     warranty: '10 Years',           shelf: '12 Years', prices: { S: 126500, M: 148500, L: 162500, XL: 178500 } },
  ],
  suv: [
    { name: 'WOW Gloss Shield',     warranty: '3 Yrs (Excl. Roof)', shelf: '5 Years',  prices: { S: 68500,  M: 72500,  L: 74500,  XL: 79500  } },
    { name: 'WOW Advance Shield',   warranty: '5 Years',            shelf: '7 Years',  prices: { S: 88500,  M: 94500,  L: 98500,  XL: 105500 } },
    { name: 'WOW Pro Shield',       warranty: '7 Years',            shelf: '10 Years', prices: { S: 122500, M: 139500, L: 134500, XL: 144500 } },
    { name: 'WOW Tough Shield',     warranty: '10 Years',           shelf: '12 Years', prices: { S: 148500, M: 168500, L: 172500, XL: 188500 } },
    { name: 'WOW Tough Pro Shield', warranty: '12 Years',           shelf: '15 Years', prices: { S: 178500, M: 182500, L: 218500, XL: 228500 } },
  ],
}

const BATH = {
  hatchback: [
    { name: 'Aqua Bath',   stars: 3, prices: { S: 250, M: 300, L: 350,  XL: null } },
    { name: 'Bubble Bath', stars: 4, prices: { S: 550, M: 600, L: 650,  XL: null } },
    { name: 'Silica Bath', stars: 5, prices: { S: 750, M: 800, L: 850,  XL: null } },
  ],
  sedan: [
    { name: 'Aqua Bath',   stars: 3, prices: { S: 450, M: 500,  L: 550,  XL: 600  } },
    { name: 'Bubble Bath', stars: 4, prices: { S: 750, M: 800,  L: 850,  XL: 900  } },
    { name: 'Silica Bath', stars: 5, prices: { S: 950, M: 1000, L: 1050, XL: 1100 } },
  ],
  suv: [
    { name: 'Aqua Bath',   stars: 3, prices: { S: 450, M: 500,  L: 550,  XL: 600  } },
    { name: 'Bubble Bath', stars: 4, prices: { S: 750, M: 800,  L: 850,  XL: 900  } },
    { name: 'Silica Bath', stars: 5, prices: { S: 950, M: 1000, L: 1050, XL: 1100 } },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) => n == null ? null : `₹${n.toLocaleString('en-IN')}`

// ─── Shared Sub-components ────────────────────────────────────────────────────

function SizeLegend() {
  return (
    <p className="text-xs text-gray-400 mt-3">
      <span className="font-medium text-gray-500">S</span> Small (e.g. Wagon R) ·{' '}
      <span className="font-medium text-gray-500">M</span> Medium (e.g. i20) ·{' '}
      <span className="font-medium text-gray-500">L</span> Large (e.g. Creta) ·{' '}
      <span className="font-medium text-gray-500">XL</span> Extra Large (e.g. Fortuner)
    </p>
  )
}

function VehicleSelector({ selected, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {VEHICLE_TYPES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
            selected === key
              ? 'bg-brand-500 border-brand-500 text-white'
              : 'border-dark-500 text-navy-700 hover:border-brand-500 hover:text-brand-500'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function BookBtn({ featured }) {
  return (
    <Link
      to="/booking"
      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
        featured
          ? 'bg-brand-500 text-white hover:bg-brand-600'
          : 'border border-dark-500 text-navy-700 hover:border-brand-500 hover:text-brand-500'
      }`}
    >
      Book <ArrowRight size={11} />
    </Link>
  )
}

function PricingTable({ products, featured }) {
  const visibleSizes = SIZES.filter(s => products.some(p => p.prices[s] != null))

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className="border-b border-dark-500">
            <th className="text-left py-3 pr-4 text-navy-800 font-semibold">Service</th>
            {visibleSizes.map(s => (
              <th key={s} className="py-3 px-3 text-center text-gray-500 font-semibold w-24">{s}</th>
            ))}
            <th className="py-3 pl-3 w-20" />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.name} className="border-b border-dark-500/40 hover:bg-gray-50 transition-colors last:border-0">
              <td className="py-4 pr-4">
                <div className="text-navy-800 font-semibold">{p.name}</div>
                {p.warranty && (
                  <div className="text-gray-400 text-xs mt-0.5">
                    Warranty {p.warranty} · Shelf life {p.shelf}
                  </div>
                )}
                {p.stars != null && (
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={i < p.stars ? 'text-brand-500 fill-brand-500' : 'text-gray-200 fill-gray-200'}
                      />
                    ))}
                  </div>
                )}
              </td>
              {visibleSizes.map(s => (
                <td key={s} className="py-4 px-3 text-center">
                  {fmt(p.prices[s])
                    ? <span className="text-brand-500 font-bold">{fmt(p.prices[s])}</span>
                    : <span className="text-gray-300 text-xs">N/A</span>
                  }
                </td>
              ))}
              <td className="py-4 pl-3 text-right">
                <BookBtn featured={featured} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DetailingTable({ data, featured }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className="border-b border-dark-500">
            <th className="text-left py-3 pr-4 text-navy-800 font-semibold">Vehicle</th>
            {SIZES.map(s => (
              <th key={s} className="py-3 px-3 text-center text-gray-500 font-semibold w-24">{s}</th>
            ))}
            <th className="py-3 pl-3 w-20" />
          </tr>
        </thead>
        <tbody>
          {VEHICLE_TYPES.map(({ key, label }) => (
            <tr key={key} className="border-b border-dark-500/40 hover:bg-gray-50 transition-colors last:border-0">
              <td className="py-4 pr-4 text-navy-800 font-semibold">{label}</td>
              {SIZES.map(s => (
                <td key={s} className="py-4 px-3 text-center">
                  <span className="text-brand-500 font-bold">{fmt(data[key][s])}</span>
                </td>
              ))}
              <td className="py-4 pl-3 text-right">
                <BookBtn featured={featured} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionCard({ title, subtitle, badge, featured = false, children }) {
  return (
    <div className={`rounded-2xl border overflow-hidden ${
      featured
        ? 'border-brand-500 shadow-xl shadow-brand-500/10'
        : 'border-dark-500 shadow-sm'
    }`}>
      <div className="p-6 border-b border-dark-500 bg-white">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-navy-800 font-black text-lg">{title}</h3>
          {badge && (
            <span className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              <Zap size={11} /> {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        <SizeLegend />
      </div>
      <div className="p-6 bg-white">{children}</div>
    </div>
  )
}

// ─── Tab Definitions ──────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'detailing', label: 'Detailing',       icon: Sparkles },
  { key: 'ceramic',   label: 'Ceramic Coating', icon: Shield   },
  { key: 'ppf',       label: 'PPF',             icon: Layers   },
  { key: 'bath',      label: 'Bath',            icon: Droplets },
]

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeTab, setActiveTab]     = useState('detailing')
  const [vehicleType, setVehicleType] = useState('hatchback')

  const vehicleLabel = VEHICLE_TYPES.find(v => v.key === vehicleType)?.label

  return (
    <div className="min-h-screen bg-white pt-24">

      {/* Hero */}
      <section className="py-16 border-b border-dark-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Services & Pricing</span>
          <h1 className="section-heading mt-2">What We Offer</h1>
          <p className="section-subheading mx-auto mt-4">
            From a quick bath to full ceramic coating and paint protection film — every service is performed
            by our certified technicians using professional-grade products only. Pricing varies by vehicle type and size.
          </p>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div className="sticky top-16 z-10 bg-white border-b border-dark-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 -mb-px">
            {CATEGORIES.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === key
                    ? 'border-brand-500 text-brand-500'
                    : 'border-transparent text-gray-500 hover:text-navy-700'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* ── Detailing ── */}
        {activeTab === 'detailing' && (
          <>
            <SectionCard
              title="Standard Detailing"
              subtitle={DETAILING_STANDARD.tagline}
            >
              <DetailingTable data={DETAILING_STANDARD} featured={false} />
            </SectionCard>

            <SectionCard
              title="Premium Detailing"
              subtitle={DETAILING_PREMIUM.tagline}
              badge="Flat 50% Off"
              featured
            >
              <DetailingTable data={DETAILING_PREMIUM} featured />
            </SectionCard>
          </>
        )}

        {/* ── Ceramic Coating ── */}
        {activeTab === 'ceramic' && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-navy-800 font-black text-xl">Ceramic Coating</h2>
                <p className="text-gray-500 text-sm mt-0.5">Select your vehicle type to see pricing.</p>
              </div>
              <VehicleSelector selected={vehicleType} onChange={setVehicleType} />
            </div>

            <SectionCard
              title={`Standard Ceramic — ${vehicleLabel}`}
              subtitle="9H · 10H · Diamond — single-layer professional coatings"
            >
              <PricingTable products={CERAMIC_STANDARD[vehicleType]} featured={false} />
            </SectionCard>

            <SectionCard
              title={`Ceramic & Graphene — ${vehicleLabel}`}
              subtitle="9H · 10H · Graphene · Graphene Matrix — next-generation protection"
              badge="Flat 40% Off"
              featured
            >
              <PricingTable products={CERAMIC_GRAPHENE[vehicleType]} featured />
            </SectionCard>
          </>
        )}

        {/* ── PPF ── */}
        {activeTab === 'ppf' && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-navy-800 font-black text-xl">Paint Protection Film</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  TPU-based film — the ultimate paint protection. Select your vehicle type.
                </p>
              </div>
              <VehicleSelector selected={vehicleType} onChange={setVehicleType} />
            </div>

            <SectionCard title={`PPF — ${vehicleLabel}`}>
              <PricingTable products={PPF[vehicleType]} featured={false} />
            </SectionCard>

            <div className="rounded-xl border border-dark-500 p-5 text-sm text-gray-500 bg-white">
              <span className="font-semibold text-navy-800">Note: </span>
              All PPF packages cover the full vehicle body. Roof is excluded on the Gloss Shield 3-year warranty tier.
              Off-car wheel PPF and custom partial coverage available on request — speak to our team when booking.
            </div>
          </>
        )}

        {/* ── Bath ── */}
        {activeTab === 'bath' && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-navy-800 font-black text-xl">Bath Services</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Three wash tiers to suit every budget. Select your vehicle type.
                </p>
              </div>
              <VehicleSelector selected={vehicleType} onChange={setVehicleType} />
            </div>

            <SectionCard title={`Bath — ${vehicleLabel}`}>
              <PricingTable products={BATH[vehicleType]} featured={false} />
            </SectionCard>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: 'Aqua Bath',   stars: 3, desc: 'Quick exterior rinse and hand wash. Perfect for a regular weekly clean.' },
                { name: 'Bubble Bath', stars: 4, desc: 'Foam pre-wash + hand wash + tyre dress. Great for a thorough bi-weekly clean.' },
                { name: 'Silica Bath', stars: 5, desc: 'Full foam + silica spray sealant + glass clean + tyre shine. Maximum shine and protection.' },
              ].map(({ name, stars, desc }) => (
                <div key={name} className="rounded-xl border border-dark-500 p-5 bg-white">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} className={i < stars ? 'text-brand-500 fill-brand-500' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <h4 className="text-navy-800 font-bold text-sm">{name}</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
