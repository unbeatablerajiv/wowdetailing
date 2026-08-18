import OpenAI from 'openai'

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
    return [{
      role: item.role,
      content: [{ type: item.role === 'assistant' ? 'output_text' : 'input_text', text: item.text.slice(0, 2500) }],
    }]
  })
}

export default async (request) => {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  if (!process.env.OPENAI_API_KEY) return json({ error: 'The AI assistant is not configured yet.' }, 500)

  try {
    const { message, image, history } = await request.json()
    if (!message && !image?.data) return json({ error: 'A message or image is required.' }, 400)
    if (image && (!allowedImageTypes.has(image.mimeType) || typeof image.data !== 'string' || image.data.length > 8_500_000)) {
      return json({ error: 'Please upload a JPG, PNG or WEBP image smaller than 6 MB.' }, 400)
    }

    const input = safeHistory(history)
    const last = input.at(-1)
    if (!last || last.role !== 'user') {
      input.push({ role: 'user', content: [{ type: 'input_text', text: String(message || 'Analyse this vehicle image.').slice(0, 2500) }] })
    }
    if (image) {
      input.at(-1).content.push({ type: 'input_image', image_url: `data:${image.mimeType};base64,${image.data}` })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const response = await openai.responses.create({
      model: 'gpt-5.6-luna',
      instructions: systemInstruction(),
      input,
      reasoning: { effort: 'low' },
      text: { verbosity: 'low' },
      max_output_tokens: 350,
      store: false,
    })
    return json({ reply: response.output_text || 'I’m unable to provide a recommendation from that input.' })
  } catch (error) {
    console.error('OpenAI chat error:', error)
    const detail = String(error?.message || '')
    const status = Number(error?.status)
    let message = 'The AI assistant is temporarily unavailable. Please try again shortly.'

    if (status === 400 || status === 401 || status === 403 || /api key|authentication|permission denied/i.test(detail)) {
      message = 'The AI assistant key needs to be updated in Netlify. Please contact WOW Detailing.'
    } else if (status === 429 || /quota|rate limit/i.test(detail)) {
      message = 'The AI assistant is receiving a high number of requests. Please try again in a moment.'
    } else if (status === 404 || /model.*not.*available/i.test(detail)) {
      message = 'The AI assistant model is being updated. Please try again shortly.'
    }

    return json({ error: message }, 500)
  }
}
