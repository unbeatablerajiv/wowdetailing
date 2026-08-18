import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import {
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_LINK,
  BUSINESS_PHONE,
  BUSINESS_PHONE_LINK,
} from '../utils/contact'

const MAP_QUERY = '87QX+36C, VIP Road, Harmu Rd, Dibdih, Ranchi, Jharkhand 834002'
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`

const contactInfo = [
  { icon: Phone, label: 'Phone', value: BUSINESS_PHONE, href: BUSINESS_PHONE_LINK },
  { icon: Mail, label: 'Email', value: BUSINESS_EMAIL, href: BUSINESS_EMAIL_LINK },
  { icon: MapPin, label: 'Location', value: 'VIP Road, Harmu Rd, near Dibdih Overbridge, Dibdih, Ranchi, Jharkhand 834002', href: MAP_URL },
  { icon: Clock, label: 'Hours', value: 'Mon–Sun 9am–8pm', href: null },
]

export default function ContactPage() {
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
        </div>

        <div className="max-w-2xl mx-auto">
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

            <div className="rounded-xl overflow-hidden border border-dark-500 h-64 bg-dark-700">
              <iframe
                title="WOW Detailing Studio location"
                src={MAP_EMBED_URL}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
