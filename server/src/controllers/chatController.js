const OpenAI = require('openai')

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

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

async function chat(req, res, next) {
  try {
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'The AI assistant is not configured yet.' })
    const { message, image, history } = req.body || {}
    if (!message && !image?.data) return res.status(400).json({ error: 'A message or image is required.' })
    if (image && (!allowedImageTypes.has(image.mimeType) || typeof image.data !== 'string' || image.data.length > 8_500_000)) {
      return res.status(400).json({ error: 'Please upload a JPG, PNG or WEBP image smaller than 6 MB.' })
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
    return res.json({ reply: response.output_text || 'I’m unable to provide a recommendation from that input.' })
  } catch (error) {
    console.error('OpenAI chat error:', error)
    return next(error)
  }
}

module.exports = { chat }
