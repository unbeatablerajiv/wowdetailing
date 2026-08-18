import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { CalendarPlus, ImagePlus, LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const WHATSAPP_URL = 'https://wa.me/916207804906'
const welcome = {
  role: 'assistant',
  text: 'Welcome to WOW! I’m your personal car-care expert. Tell me your car, its condition, or the finish you’re after—and I’ll help you find the perfect detail, protection, and shine.'
}

export default function DetailingChat() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([welcome])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const fileRef = useRef(null)
  const canSend = useMemo(() => text.trim() && !busy, [text, busy])

  async function sendMessage(rawText, image = null) {
    const message = rawText.trim()
    if ((!message && !image) || busy) return

    const userMessage = message || 'Please analyse this car photo and recommend suitable detailing work.'
    const nextMessages = [...messages, { role: 'user', text: userMessage }]
    setMessages(nextMessages)
    setText('')
    setBusy(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          image,
          history: nextMessages.slice(-8).map(({ role, text }) => ({ role, text })),
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to contact the AI assistant.')
      setMessages((current) => [...current, { role: 'assistant', text: data.reply }])
    } catch (error) {
      setMessages((current) => [...current, {
        role: 'assistant',
        text: error.message || 'I couldn’t complete that request right now. Please try again shortly.',
      }])
    } finally {
      setBusy(false)
    }
  }

  function handleImage(file) {
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      window.alert('Please upload a JPG, PNG or WEBP image.')
      return
    }
    if (file.size > 6 * 1024 * 1024) {
      window.alert('Please upload an image smaller than 6 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const [prefix, data] = String(reader.result).split(',')
      sendMessage(text || 'Analyse this car photo. What detailing work would you recommend?', {
        data,
        mimeType: prefix.match(/data:(.*?);/)?.[1],
      })
    }
    reader.readAsDataURL(file)
  }

  function startBooking() {
    setOpen(false)
    navigate('/booking')
  }

  return (
    <div className="detailer-chat">
      {open && (
        <section className="detailer-chat__panel" aria-label="WOW AI Detailer">
          <header className="detailer-chat__header">
            <span className="detailer-chat__mark">W</span>
            <span><strong>WOW AI Detailer</strong><small><i /> Detailing consultant</small></span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </header>

          <div className="detailer-chat__body">
            {messages.map((item, index) => (
              <div className={`detailer-chat__message ${item.role}`} key={index}>
                <ReactMarkdown>{item.text}</ReactMarkdown>
              </div>
            ))}
            {busy && <p className="detailer-chat__message assistant"><LoaderCircle size={16} className="detailer-chat__spinner" /> Thinking…</p>}
            <div className="detailer-chat__contact-actions">
              <button className="detailer-chat__booking" type="button" onClick={startBooking}><CalendarPlus size={14} /> Book an appointment</button>
              <a className="detailer-chat__whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={14} /> Connect on WhatsApp</a>
            </div>
          </div>

          <form className="detailer-chat__composer" onSubmit={(event) => { event.preventDefault(); sendMessage(text) }}>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(event) => handleImage(event.target.files?.[0])} />
            <button type="button" onClick={() => fileRef.current?.click()} aria-label="Upload a car photo" disabled={busy}><ImagePlus size={19} /></button>
            <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Ask about your car…" aria-label="Chat message" />
            <button type="submit" aria-label="Send message" disabled={!canSend}><Send size={18} /></button>
          </form>
        </section>
      )}
      {!open && (
        <button className="detailer-chat__launcher" type="button" onClick={() => setOpen(true)} aria-label="Open WOW AI Detailer">
          <Sparkles size={18} /><span><strong>WOW AI</strong><small>Ask the Detailer</small></span><MessageCircle size={19} />
        </button>
      )}
    </div>
  )
}
