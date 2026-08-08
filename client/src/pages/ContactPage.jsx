import { useState } from 'react'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import {
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_LINK,
  BUSINESS_PHONE,
  BUSINESS_PHONE_LINK,
  BUSINESS_WHATSAPP_LINK,
  buildMailtoLink,
} from '../utils/contact'

const contactInfo = [
  { icon: Phone, label: 'Phone', value: BUSINESS_PHONE, href: BUSINESS_PHONE_LINK },
  { icon: Mail, label: 'Email', value: BUSINESS_EMAIL, href: BUSINESS_EMAIL_LINK },
  { icon: MapPin, label: 'Location', value: '42 MG Road, Bengaluru, Karnataka 560001', href: '#' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri 8am–6pm, Sat 9am–4pm', href: null },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = buildMailtoLink({
      subject: `Website enquiry: ${form.subject}`,
      body: [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        '',
        form.message,
      ].join('\n'),
    })

    setLoading(true)
    window.location.href = mailtoLink
    toast.success('Your email app is opening now.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Contact</span>
          <h1 className="section-heading mt-2">Get in Touch</h1>
          <p className="section-subheading mx-auto mt-4">
            Questions about a service, a custom quote, or just want to say hi? We'd love to hear from you.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            The site is currently taking enquiries by email, phone, and WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-navy-800 font-bold text-xl mb-6">Contact Information</h2>
            <div className="space-y-4 mb-10">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-4 bg-dark-700 border border-dark-500 rounded-xl">
                  <div className="w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-500" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{label}</div>
                    {href && href !== '#' ? (
                      <a href={href} className="text-navy-800 text-sm hover:text-brand-500 transition-colors">{value}</a>
                    ) : (
                      <div className="text-navy-800 text-sm">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-dark-500 h-48 bg-dark-700 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={32} className="mx-auto mb-2 text-dark-400" />
                <p className="text-sm">42 MG Road, Bengaluru</p>
                <p className="text-xs text-gray-400 mt-1">Map integration ready for production</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-navy-800 font-bold text-xl mb-6">Send a Message</h2>
            <div className="mb-5 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4 text-sm text-gray-600">
              Submitting this form opens your email app with your message pre-filled.
              If you prefer, you can also call <a href={BUSINESS_PHONE_LINK} className="text-brand-500 hover:underline">{BUSINESS_PHONE}</a> or
              {' '}<a href={BUSINESS_WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-brand-500 hover:underline">message us on WhatsApp</a>.
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Your Name <span className="text-red-600" aria-hidden="true">*</span></label>
                  <input className="input-field" placeholder="Rahul Sharma" value={form.name} onChange={e => update('name', e.target.value)} required />
                </div>
                <div>
                  <label className="label">Email Address <span className="text-red-600" aria-hidden="true">*</span></label>
                  <input className="input-field" type="email" placeholder="rahul@example.com" value={form.email} onChange={e => update('email', e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="label">Subject <span className="text-red-600" aria-hidden="true">*</span></label>
                <input className="input-field" placeholder="Question about Full Detail service..." value={form.subject} onChange={e => update('subject', e.target.value)} required />
              </div>
              <div>
                <label className="label">Message <span className="text-red-600" aria-hidden="true">*</span></label>
                <textarea
                  className="input-field resize-none"
                  rows={6}
                  placeholder="Tell us what you need..."
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-40">
                {loading ? 'Opening email...' : <><Send size={16} /> Compose Email</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
