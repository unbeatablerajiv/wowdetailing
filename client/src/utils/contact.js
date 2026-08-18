export const BUSINESS_PHONE = '+91 6207804906'
export const BUSINESS_PHONE_LINK = 'tel:+916207804906'
export const BUSINESS_WHATSAPP_LINK = 'https://wa.me/916207804906'
export const BUSINESS_EMAIL = 'detailingdaddy2021@gmail.com'
export const BUSINESS_EMAIL_LINK = `mailto:${BUSINESS_EMAIL}`

export const buildMailtoLink = ({ subject, body }) => {
  const params = new URLSearchParams()

  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)

  return `${BUSINESS_EMAIL_LINK}?${params.toString()}`
}

export const buildWhatsAppLink = (message) =>
  `${BUSINESS_WHATSAPP_LINK}?text=${encodeURIComponent(message)}`
