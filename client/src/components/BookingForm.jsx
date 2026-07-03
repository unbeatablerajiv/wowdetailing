import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import {
  CheckCircle, ChevronRight, ChevronLeft, Car, User,
  Calendar, ClipboardList, Zap, ChevronDown,
} from 'lucide-react'
import indianCars from '../data/indianCars'
import {
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_LINK,
  BUSINESS_PHONE,
  BUSINESS_PHONE_LINK,
  BUSINESS_WHATSAPP_LINK,
  buildMailtoLink,
  buildWhatsAppLink,
} from '../utils/contact'

// ─── Static Data ──────────────────────────────────────────────────────────────

const CURRENT_YEAR = new Date().getFullYear()
const YEARS  = Array.from({ length: CURRENT_YEAR - 1989 }, (_, i) => String(CURRENT_YEAR - i))
const MAKES  = Object.keys(indianCars).sort()

const VEHICLE_CATEGORIES = [
  { key: 'hatchback', label: 'Hatchback', example: 'e.g. Wagon R, Swift, Polo'     },
  { key: 'sedan',     label: 'Sedan',     example: 'e.g. City, Verna, Ciaz'        },
  { key: 'suv',       label: 'SUV',       example: 'e.g. Creta, Brezza, Fortuner'  },
]

const VEHICLE_SIZES = [
  { key: 'S',  label: 'S',  example: 'Small'       },
  { key: 'M',  label: 'M',  example: 'Medium'      },
  { key: 'L',  label: 'L',  example: 'Large'       },
  { key: 'XL', label: 'XL', example: 'Extra Large' },
]

const SERVICES = [
  { id: 'bath',            label: 'Bath',                  price: 'From ₹250',    duration: '30–60 min', badge: null           },
  { id: 'detailing_std',   label: 'Standard Detailing',    price: 'From ₹4,500',  duration: '3–5 hrs',   badge: null           },
  { id: 'detailing_prem',  label: 'Premium Detailing',     price: 'From ₹7,500',  duration: '4–6 hrs',   badge: 'Flat 50% Off' },
  { id: 'ceramic_coating', label: 'Ceramic Coating',       price: 'From ₹12,500', duration: '1 day',     badge: 'Flat 40% Off' },
  { id: 'ppf',             label: 'Paint Protection Film', price: 'From ₹38,500', duration: '1–2 days',  badge: null           },
]

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM',  '4:00 PM',
]

const STEPS = [
  { id: 1, label: 'Vehicle',      icon: Car           },
  { id: 2, label: 'Service',      icon: ClipboardList },
  { id: 3, label: 'Date & Time',  icon: Calendar      },
  { id: 4, label: 'Your Details', icon: User          },
]

const initialForm = {
  vehicleYear: '', vehicleMake: '', vehicleModel: '', vehicleColor: '',
  vehicleCategory: '', vehicleSize: '',
  serviceType: '',
  date: '', timeSlot: '',
  firstName: '', lastName: '', email: '', phone: '', notes: '',
}

const formatBookingMessage = (form, selectedService) => [
  'Hello Wow Detailing, I would like to request a booking.',
  '',
  `Name: ${form.firstName} ${form.lastName}`.trim(),
  `Phone: ${form.phone}`,
  `Email: ${form.email}`,
  `Vehicle: ${form.vehicleYear} ${form.vehicleMake} ${form.vehicleModel}`,
  `Vehicle type: ${form.vehicleCategory} / ${form.vehicleSize}`,
  `Color: ${form.vehicleColor || 'Not specified'}`,
  `Service: ${selectedService?.label || form.serviceType}`,
  `Preferred date: ${form.date}`,
  `Preferred time: ${form.timeSlot}`,
  `Notes: ${form.notes || 'None'}`,
].join('\n')

// ─── SearchableSelect ─────────────────────────────────────────────────────────

function SearchableSelect({ options, value, onChange, placeholder, disabled = false }) {
  const [query, setQuery] = useState('')
  const [open, setOpen]   = useState(false)
  const containerRef      = useRef(null)
  const searchRef         = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus()
  }, [open])

  const filtered = (
    query.trim()
      ? options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
      : options
  ).slice(0, 120)

  const handleToggle = () => {
    if (!disabled) {
      setOpen(v => !v)
      if (!open) setQuery('')
    }
  }

  const handleSelect = (opt) => {
    onChange(opt)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`input-field w-full flex items-center justify-between gap-2 text-left transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${open ? 'border-brand-500 ring-1 ring-brand-500/20' : ''}`}
      >
        <span className={`text-sm truncate flex-1 ${value ? 'text-navy-800' : 'text-gray-400'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-30 w-full bg-white border border-dark-500 rounded-xl shadow-xl mt-1 overflow-hidden">
          <div className="p-2 border-b border-dark-500/60">
            <input
              ref={searchRef}
              type="text"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-dark-500 rounded-lg outline-none text-navy-800 placeholder-gray-400 focus:border-brand-500 transition-colors"
              placeholder="Search..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="max-h-52 overflow-y-auto overscroll-contain">
            {filtered.length === 0 ? (
              <p className="px-4 py-4 text-sm text-gray-400 text-center">No results found</p>
            ) : (
              filtered.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-brand-500/5 hover:text-brand-500 ${
                    value === opt
                      ? 'bg-brand-500/5 text-brand-500 font-semibold'
                      : 'text-navy-800'
                  }`}
                >
                  {opt}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BookingForm() {
  const [step, setStep]             = useState(1)
  const [form, setForm]             = useState(initialForm)
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  // Models derived directly from selected make — no async needed
  const models = form.vehicleMake ? (indianCars[form.vehicleMake] ?? []) : []

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  // Cascade: year change clears model only
  const handleYearChange = (year) =>
    setForm(prev => ({ ...prev, vehicleYear: year, vehicleModel: '' }))

  // Cascade: make change clears model
  const handleMakeChange = (make) =>
    setForm(prev => ({ ...prev, vehicleMake: make, vehicleModel: '' }))

  const canProceed = () => {
    if (step === 1) return form.vehicleYear && form.vehicleMake && form.vehicleModel && form.vehicleCategory && form.vehicleSize
    if (step === 2) return !!form.serviceType
    if (step === 3) return form.date && form.timeSlot
    if (step === 4) return form.firstName && form.lastName && form.email && form.phone
    return true
  }

  const handleSubmit = async () => {
    const selectedService = SERVICES.find(s => s.id === form.serviceType)
    const bookingMessage = formatBookingMessage(form, selectedService)
    const requestRef = `WOW-${Date.now().toString().slice(-6)}`

    setLoading(true)
    window.open(buildWhatsAppLink(bookingMessage), '_blank', 'noopener,noreferrer')
    setBookingRef(requestRef)
    setSubmitted(true)
    toast.success('Your booking request is ready to send on WhatsApp.')
    setLoading(false)
  }

  const selectedService = SERVICES.find(s => s.id === form.serviceType)
  const bookingMessage = formatBookingMessage(form, selectedService)
  const bookingEmailLink = buildMailtoLink({
    subject: `Booking request for ${selectedService?.label || 'Wow Detailing service'}`,
    body: bookingMessage,
  })

  // ── Confirmed screen ──────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-brand-500/10 border border-brand-500/30 rounded-full flex items-center justify-center mb-6 animate-float">
          <CheckCircle size={36} className="text-brand-500" />
        </div>
        <h3 className="text-navy-800 text-2xl font-bold mb-2">Booking Request Ready</h3>
        <p className="text-gray-600 mb-2">
          Thank you, <span className="text-navy-800 font-medium">{form.firstName}</span>.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          We prepared your request for a{' '}
          <span className="text-brand-500">{selectedService?.label}</span> on{' '}
          <span className="text-brand-500">{form.date}</span> at{' '}
          <span className="text-brand-500">{form.timeSlot}</span>. Use WhatsApp, email, or call us to confirm it.
        </p>
        <div className="bg-dark-700 border border-dark-500 rounded-xl px-8 py-4 mb-8">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Request Reference</p>
          <p className="text-brand-500 font-mono font-bold text-lg">{bookingRef}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={buildWhatsAppLink(bookingMessage)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-sm"
          >
            Send on WhatsApp
          </a>
          <a href={bookingEmailLink} className="btn-outline text-sm">
            Send by Email
          </a>
          <a href={BUSINESS_PHONE_LINK} className="btn-outline text-sm">
            Call {BUSINESS_PHONE}
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-5">
          We’ll confirm manually once you contact us through WhatsApp, email, or phone.
        </p>
        <button
          onClick={() => { setForm(initialForm); setStep(1); setSubmitted(false) }}
          className="mt-8 btn-outline text-sm"
        >
          Make Another Booking
        </button>
      </div>
    )
  }

  // ── Main form ─────────────────────────────────────────────────────────────

  return (
    <div>
      <div className="mb-6 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4 text-sm text-gray-600">
        This static version prepares your booking details and opens WhatsApp on the last step so you can send the request instantly.
        You can also reach us at <a href={BUSINESS_EMAIL_LINK} className="text-brand-500 hover:underline">{BUSINESS_EMAIL}</a>.
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((s, idx) => {
          const Icon     = s.icon
          const isActive = s.id === step
          const isDone   = s.id < step
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isActive ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                  : isDone  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-dark-400 text-gray-400'
                }`}>
                  <Icon size={16} />
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  isActive ? 'text-brand-500' : isDone ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 sm:mx-3 mb-4 ${isDone ? 'bg-brand-500' : 'bg-dark-500'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Step 1: Vehicle ── */}
      {step === 1 && (
        <div>
          <h3 className="text-navy-800 font-bold text-xl mb-1">Tell us about your vehicle</h3>
          <p className="text-gray-400 text-sm mb-6">Select year → make → model in order.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

            {/* Year */}
            <div>
              <label className="label">Year *</label>
              <SearchableSelect
                options={YEARS}
                value={form.vehicleYear}
                onChange={handleYearChange}
                placeholder="Select year"
              />
            </div>

            {/* Make */}
            <div>
              <label className="label">Make *</label>
              <SearchableSelect
                options={MAKES}
                value={form.vehicleMake}
                onChange={handleMakeChange}
                placeholder={form.vehicleYear ? 'Select make' : 'Select year first'}
                disabled={!form.vehicleYear}
              />
            </div>

            {/* Model */}
            <div>
              <label className="label">Model *</label>
              {models.length > 0 ? (
                <SearchableSelect
                  options={models}
                  value={form.vehicleModel}
                  onChange={val => update('vehicleModel', val)}
                  placeholder="Select model"
                  disabled={!form.vehicleMake}
                />
              ) : (
                <>
                  <input
                    className={`input-field ${!form.vehicleMake ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={form.vehicleMake ? 'Type your model' : 'Select make first'}
                    value={form.vehicleModel}
                    onChange={e => update('vehicleModel', e.target.value)}
                    disabled={!form.vehicleMake}
                  />
                  {form.vehicleMake && (
                    <p className="text-xs text-gray-400 mt-1.5">
                      Model list not available for this make — type manually.
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Colour */}
            <div>
              <label className="label">Colour</label>
              <input
                className="input-field"
                placeholder="e.g. Midnight Black"
                value={form.vehicleColor}
                onChange={e => update('vehicleColor', e.target.value)}
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="mb-5">
            <label className="label mb-2">Vehicle Type *</label>
            <div className="grid grid-cols-3 gap-3">
              {VEHICLE_CATEGORIES.map(({ key, label, example }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update('vehicleCategory', key)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    form.vehicleCategory === key
                      ? 'border-brand-500 bg-brand-500/5'
                      : 'border-dark-500 bg-white hover:border-brand-500/40'
                  }`}
                >
                  <div className="text-navy-800 font-semibold text-sm">{label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{example}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Size */}
          <div>
            <label className="label mb-2">Vehicle Size *</label>
            <div className="grid grid-cols-4 gap-3">
              {VEHICLE_SIZES.map(({ key, label, example }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update('vehicleSize', key)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    form.vehicleSize === key
                      ? 'border-brand-500 bg-brand-500/5'
                      : 'border-dark-500 bg-white hover:border-brand-500/40'
                  }`}
                >
                  <div className="text-navy-800 font-bold text-lg">{label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{example}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              S = Small (Wagon R) · M = Medium (i20) · L = Large (Creta) · XL = Extra Large (Fortuner)
            </p>
          </div>
        </div>
      )}

      {/* ── Step 2: Service ── */}
      {step === 2 && (
        <div>
          <h3 className="text-navy-800 font-bold text-xl mb-6">Choose your service</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => update('serviceType', s.id)}
                className={`text-left p-5 rounded-xl border-2 transition-all ${
                  form.serviceType === s.id
                    ? 'border-brand-500 bg-brand-500/5'
                    : 'border-dark-500 bg-white hover:border-brand-500/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-navy-800 font-semibold">{s.label}</span>
                      {s.badge && (
                        <span className="inline-flex items-center gap-1 bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          <Zap size={9} /> {s.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{s.duration}</div>
                  </div>
                  <span className="text-brand-500 font-bold text-sm shrink-0">{s.price}</span>
                </div>
                {form.serviceType === s.id && (
                  <div className="mt-3 flex items-center gap-1.5 text-brand-500 text-xs font-medium">
                    <CheckCircle size={13} /> Selected
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Final price depends on your vehicle type and size. Our team will confirm the exact amount before your appointment.
          </p>
        </div>
      )}

      {/* ── Step 3: Date & Time ── */}
      {step === 3 && (
        <div>
          <h3 className="text-navy-800 font-bold text-xl mb-6">Pick a date & time</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="label">Preferred Date *</label>
              <input
                className="input-field"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={form.date}
                onChange={e => update('date', e.target.value)}
              />
            </div>
            <div>
              <label className="label">Preferred Time *</label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => update('timeSlot', slot)}
                    className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                      form.timeSlot === slot
                        ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                        : 'border-dark-500 text-gray-600 hover:border-brand-500/40 bg-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 4: Contact ── */}
      {step === 4 && (
        <div>
          <h3 className="text-navy-800 font-bold text-xl mb-6">Your contact details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">First Name *</label>
              <input className="input-field" placeholder="Rahul" value={form.firstName} onChange={e => update('firstName', e.target.value)} />
            </div>
            <div>
              <label className="label">Last Name *</label>
              <input className="input-field" placeholder="Sharma" value={form.lastName} onChange={e => update('lastName', e.target.value)} />
            </div>
            <div>
              <label className="label">Email *</label>
              <input className="input-field" type="email" placeholder="rahul@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div>
              <label className="label">Phone *</label>
              <input className="input-field" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Additional Notes</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="Any specific concerns, scratches, or areas to focus on..."
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
              />
            </div>
          </div>

          {/* Booking summary */}
          <div className="mt-6 p-5 bg-dark-700 border border-dark-500 rounded-xl">
            <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Booking Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-500">Vehicle:</span>
              <span className="text-navy-800">{form.vehicleYear} {form.vehicleMake} {form.vehicleModel}</span>
              <span className="text-gray-500">Type / Size:</span>
              <span className="text-navy-800 capitalize">{form.vehicleCategory} · Size {form.vehicleSize}</span>
              <span className="text-gray-500">Service:</span>
              <span className="text-navy-800">{selectedService?.label}</span>
              <span className="text-gray-500">Date:</span>
              <span className="text-navy-800">{form.date}</span>
              <span className="text-gray-500">Time:</span>
              <span className="text-navy-800">{form.timeSlot}</span>
              <span className="text-gray-500">Est. Price:</span>
              <span className="text-brand-500 font-bold">{selectedService?.price}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            step === 1 ? 'opacity-0 pointer-events-none' : 'text-navy-700 border border-dark-500 hover:border-brand-500'
          }`}
        >
          <ChevronLeft size={16} /> Back
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Continue <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || loading}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        )}
      </div>
    </div>
  )
}
