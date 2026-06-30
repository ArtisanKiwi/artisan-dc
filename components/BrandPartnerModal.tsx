'use client'

import { useEffect, useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClass = "w-full rounded-lg px-4 py-3 text-sm text-cream outline-none"
const inputStyle = { background: 'rgba(65,90,119,0.15)', border: '1px solid rgba(65,90,119,0.3)' }
const labelStyle = { color: 'rgba(255,255,255,0.75)' }

function CheckboxGroup({ label, options, selected, onChange }: {
  label: string
  options: string[]
  selected: string[]
  onChange: (val: string[]) => void
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])
  }
  return (
    <div>
      <label className="block text-xs font-medium mb-2" style={labelStyle}>{label}</label>
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <span
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: selected.includes(opt) ? '#EAB308' : 'rgba(65,90,119,0.15)',
                border: `1px solid ${selected.includes(opt) ? '#EAB308' : 'rgba(65,90,119,0.4)'}`,
              }}
            >
              {selected.includes(opt) && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#0D1B2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <input type="checkbox" className="sr-only" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
            <span className="text-sm" style={{ color: '#96B0C8' }}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function RadioGroup({ label, options, selected, onChange }: {
  label: string
  options: string[]
  selected: string
  onChange: (val: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-2" style={labelStyle}>{label}</label>
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: selected === opt ? '#EAB308' : 'rgba(65,90,119,0.15)',
                border: `1px solid ${selected === opt ? '#EAB308' : 'rgba(65,90,119,0.4)'}`,
              }}
            >
              {selected === opt && <span className="w-1.5 h-1.5 rounded-full bg-[#0D1B2A]" />}
            </span>
            <input type="radio" className="sr-only" checked={selected === opt} onChange={() => onChange(opt)} />
            <span className="text-sm" style={{ color: '#96B0C8' }}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default function BrandPartnerModal() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    role: '',
    enquiryTypes: [] as string[],
    brandCategory: '',
    brandStage: '',
    markets: '',
    budget: '',
    timing: '',
    message: '',
  })

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
      await fetch(endpoint, {
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
        className="relative z-10 w-full max-w-lg rounded-2xl p-8 overflow-y-auto"
        style={{ background: '#0D1B2A', border: '1px solid rgba(65,90,119,0.35)', maxHeight: '90vh' }}
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={labelStyle}>Full name</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Smith" className={inputClass} style={inputStyle} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={labelStyle}>Email address</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@yourbrand.com" className={inputClass} style={inputStyle} />
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={labelStyle}>Company name</label>
                <input type="text" required value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Your Brand Ltd" className={inputClass} style={inputStyle} />
              </div>

              {/* Website */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={labelStyle}>Company website</label>
                <input type="url" value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  placeholder="https://yourbrand.com" className={inputClass} style={inputStyle} />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={labelStyle}>Role / Title</label>
                <input type="text" value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  placeholder="e.g. Founder, Marketing Manager" className={inputClass} style={inputStyle} />
              </div>

              <div style={{ borderTop: '1px solid rgba(65,90,119,0.2)', paddingTop: '1.25rem' }} />

              {/* Enquiry type */}
              <CheckboxGroup
                label="Enquiry type"
                options={['Event activation', 'Data capture partnerships', 'Investor enquiry', 'Other']}
                selected={form.enquiryTypes}
                onChange={val => setForm(f => ({ ...f, enquiryTypes: val }))}
              />

              {/* Brand category */}
              <RadioGroup
                label="Brand category"
                options={['Food & beverage', 'Health & wellness', 'Homewares / lifestyle', 'Beauty & personal care', 'Other']}
                selected={form.brandCategory}
                onChange={val => setForm(f => ({ ...f, brandCategory: val }))}
              />

              {/* Brand stage */}
              <RadioGroup
                label="Brand stage"
                options={['Early-stage / pre-launch', 'Launched & building retail presence', 'Established retail presence']}
                selected={form.brandStage}
                onChange={val => setForm(f => ({ ...f, brandStage: val }))}
              />

              {/* Markets */}
              <RadioGroup
                label="Markets of interest"
                options={['Australia', 'New Zealand', 'Both / not sure']}
                selected={form.markets}
                onChange={val => setForm(f => ({ ...f, markets: val }))}
              />

              {/* Budget */}
              <RadioGroup
                label="Estimated budget range"
                options={['Under $10k', '$10k - $50k', '$50k+', 'Not sure yet']}
                selected={form.budget}
                onChange={val => setForm(f => ({ ...f, budget: val }))}
              />

              {/* Timing */}
              <RadioGroup
                label="Ideal timing"
                options={['Within the next month', '1-3 months', '3-6 months', 'Just exploring']}
                selected={form.timing}
                onChange={val => setForm(f => ({ ...f, timing: val }))}
              />

              {/* Message */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={labelStyle}>Tell us more</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your brand, goals, or anything else we should know..."
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </div>

              {status === 'error' && (
                <p className="text-xs" style={{ color: '#f87171' }}>Something went wrong. Please try again or email us directly.</p>
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
