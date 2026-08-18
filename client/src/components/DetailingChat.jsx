import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { CalendarPlus, ImagePlus, LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const WHATSAPP_URL = 'https://wa.me/916207804906'
const CHAT_COOLDOWN_MS = 15_000
const CHAT_COOLDOWN_KEY = 'wow-ai-chat-cooldown-until'
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
  const [cooldownUntil, setCooldownUntil] = useState(() => Number(localStorage.getItem(CHAT_COOLDOWN_KEY)) || 0)
  const [now, setNow] = useState(Date.now())
  const fileRef = useRef(null)
  const cooldownSeconds = Math.max(0, Math.ceil((cooldownUntil - now) / 1000))
  const canSend = useMemo(() => text.trim() && !busy && cooldownSeconds === 0, [text, busy, cooldownSeconds])

  useEffect(() => {
    if (cooldownSeconds === 0) return undefined
    const timer = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(timer)
  }, [cooldownSeconds])

  async function sendMessage(rawText, image = null) {
    const message = rawText.trim()
    if ((!message && !image) || busy || cooldownSeconds > 0) return

    const userMessage = message || 'Please analyse this car photo and recommend suitable detailing work.'
    const nextMessages = [...messages, { role: 'user', text: userMessage }]
    setMessages(nextMessages)
    setText('')
    setBusy(true)
    const nextCooldownUntil = Date.now() + CHAT_COOLDOWN_MS
    localStorage.setItem(CHAT_COOLDOWN_KEY, String(nextCooldownUntil))
    setCooldownUntil(nextCooldownUntil)
    setNow(Date.now())

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
              <button className="detailer-chat__booking" type="button" onClick={startBooking}><CalendarPlus size={14} /> Book a Visit</button>
              <a className="detailer-chat__whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.56 0 .25 5.3.25 11.83c0 2.08.54 4.1 1.57 5.88L.16 23.8l6.25-1.64a11.8 11.8 0 0 0 5.66 1.44h.01c6.52 0 11.83-5.3 11.83-11.83 0-3.16-1.23-6.13-3.39-8.29m-8.44 18.1a9.78 9.78 0 0 1-4.99-1.37l-.36-.22-3.7.97.99-3.61-.24-.37a9.78 9.78 0 1 1 8.3 4.6m5.36-7.34c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.2-.34.22-.63.08-.29-.15-1.2-.44-2.29-1.4-.85-.75-1.42-1.67-1.59-1.96-.17-.3-.02-.45.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.64-1.54-.87-2.11-.23-.55-.47-.48-.64-.49h-.55c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.7-.69 1.94-1.35.24-.67.24-1.23.17-1.35-.07-.13-.26-.2-.55-.34" /></svg>
                WoW Expert
              </a>
            </div>
            {cooldownSeconds > 0 && <p className="detailer-chat__cooldown">Next question available in {cooldownSeconds}s</p>}
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
