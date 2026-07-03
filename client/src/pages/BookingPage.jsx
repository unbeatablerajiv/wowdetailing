import BookingForm from '../components/BookingForm'

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-dark-800 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Online Booking</span>
          <h1 className="text-3xl md:text-4xl font-black text-navy-800 mt-2">Book Your Appointment</h1>
          <p className="text-gray-600 mt-3">
            Takes less than 2 minutes. We'll confirm within 24 hours.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-dark-500 rounded-2xl p-6 sm:p-8 shadow-sm">
          <BookingForm />
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          Prefer to call? <a href="tel:+919876543210" className="text-brand-500 hover:underline">+91 98765 43210</a> — Mon–Sat 8am–5pm
        </p>
      </div>
    </div>
  )
}
