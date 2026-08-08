import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

const links = {
  Pages: [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Book Appointment', to: '/booking' },
    { label: 'Contact', to: '/contact' },
  ],
  Services: [
    { label: 'Essential Wash', to: '/services' },
    { label: 'Interior Detail', to: '/services' },
    { label: 'Full Detail', to: '/services' },
    { label: 'Premium Package', to: '/services' },
  ],
}

const socialLinks = [
  { label: 'YouTube', href: 'https://www.youtube.com/@wowdetailingstudio', icon: Youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/wowdetailingofficial/', icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1Dx1pS35P4/', icon: Facebook },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src="/wow-logo.png" alt="Wow Detailing" className="h-10 w-auto bg-white rounded-lg px-2 py-0.5" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium car detailing studio dedicated to making your vehicle shine. Professional results, every time.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit Wow Detailing on ${label}`}
                  title={label}
                  className="w-9 h-9 bg-navy-800 border border-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-400 hover:border-brand-500 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-gray-400 text-sm hover:text-brand-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-brand-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">42 MG Road,<br />Bengaluru, Karnataka 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brand-500 shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brand-500 shrink-0" />
                <span className="text-gray-400 text-sm">hello@wowdetailing.com</span>
              </li>
            </ul>
            <div className="mt-5 text-sm text-gray-500">
              <p>Mon – Fri: 8am – 6pm</p>
              <p>Saturday: 9am – 4pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Wow Detailing. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with ❤ — React + Node.js + PostgreSQL
          </p>
        </div>
      </div>
    </footer>
  )
}
