'use client'

import { useEffect, useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function BrandPartnerModal() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', website: '' })

  useEffect(() => {
    const handler = () => { setOpen(true); setStatus('idle') }
    window.addEventListener('open-partner-modal', handler)
    return () => window.removeEventListener('open-partner-modal', handler)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT
      if (!endpoint) throw new Error('Form endpoint not configured')
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        mode: 'no-cors',
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(13,27,42,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={() => setOpen(false)}
      />
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8"
        style={{ background: '#0D1B2A', border: '1px solid rgba(65,90,119,0.35)' }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-lg"
          style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(65,90,119,0.15)' }}
          aria-label="Close"
        >
          &times;
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-display font-bold text-cream text-xl mb-2">Application received</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#96B0C8' }}>
              Thanks for your interest. We will be in touch shortly to discuss next steps.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-display font-bold text-cream text-2xl mb-1">Become a brand partner</h2>
            <p className="text-sm mb-6" style={{ color: '#96B0C8' }}>Tell us about your brand and we will be in touch.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>Full name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Smith"
                  className="w-full rounded-lg px-4 py-3 text-sm text-cream outline-none"
                  style={{ background: 'rgba(65,90,119,0.15)', border: '1px solid rgba(65,90,119,0.3)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>Email address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@yourbrand.com"
                  className="w-full rounded-lg px-4 py-3 text-sm text-cream outline-none"
                  style={{ background: 'rgba(65,90,119,0.15)', border: '1px solid rgba(65,90,119,0.3)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>Company name</label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Your Brand Ltd"
                  className="w-full rounded-lg px-4 py-3 text-sm text-cream outline-none"
                  style={{ background: 'rgba(65,90,119,0.15)', border: '1px solid rgba(65,90,119,0.3)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>Company website</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  placeholder="https://yourbrand.com"
                  className="w-full rounded-lg px-4 py-3 text-sm text-cream outline-none"
                  style={{ background: 'rgba(65,90,119,0.15)', border: '1px solid rgba(65,90,119,0.3)' }}
                />
              </div>

              {status === 'error' && (
                <p className="text-xs" style={{ color: '#f87171' }}>Something went wrong. Please email us at contact@kiwiartisan.com.</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full justify-center mt-2"
                style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
              >
                {status === 'submitting' ? 'Sending...' : 'Submit application'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
