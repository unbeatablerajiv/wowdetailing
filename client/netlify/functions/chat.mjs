import { GoogleGenAI } from '@google/genai'

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json' },
})

function systemInstruction() {
  const business = process.env.BUSINESS_NAME || 'WOW Detailing Studio'
  return `You are the AI detailing consultant for ${business}, a premium automotive detailing studio in India.

Recommend services based on the car, its condition, customer goals and budget. Keep replies concise, friendly and premium (normally under 180 words). Do not invent prices, warranties, brands, discounts or availability. Explain that photo analysis is preliminary and a physical inspection is needed when damage severity matters. Never claim a photo proves paint depth, repaint history, structural damage or that a scratch will definitely polish out. When the visitor is ready, invite them to use the website booking form or WhatsApp.`
}

function safeHistory(history) {
  if (!Array.isArray(history)) return []
  return history.slice(-8).flatMap((item) => {
    if (!item || !['user', 'assistant'].includes(item.role) || typeof item.text !== 'string') return []
    return [{ role: item.role === 'assistant' ? 'model' : 'user', parts: [{ text: item.text.slice(0, 2500) }] }]
  })
}

export default async (request) => {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  if (!process.env.GEMINI_API_KEY) return json({ error: 'The AI assistant is not configured yet.' }, 500)

  try {
    const { message, image, history } = await request.json()
    if (!message && !image?.data) return json({ error: 'A message or image is required.' }, 400)
    if (image && (!allowedImageTypes.has(image.mimeType) || typeof image.data !== 'string' || image.data.length > 8_500_000)) {
      return json({ error: 'Please upload a JPG, PNG or WEBP image smaller than 6 MB.' }, 400)
    }

    const contents = safeHistory(history)
    const last = contents.at(-1)
    if (!last || last.role !== 'user') contents.push({ role: 'user', parts: [{ text: String(message || 'Analyse this vehicle image.').slice(0, 2500) }] })
    if (image) contents.at(-1).parts.push({ inlineData: { mimeType: image.mimeType, data: image.data } })

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: { systemInstruction: systemInstruction(), temperature: 0.35 },
    })
    return json({ reply: response.text || 'I’m unable to provide a recommendation from that input.' })
  } catch (error) {
    console.error('Gemini chat error:', error)
    return json({ error: 'AI request failed. Please try again shortly.' }, 500)
  }
}
