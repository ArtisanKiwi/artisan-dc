'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo('.cta-content', { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="contact" className="section-pad relative overflow-hidden" style={{ background: '#0D1B2A' }}>
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(16,41,69,0.6) 0%, rgba(234,179,8,0.04) 60%, transparent 75%)' }} />

      <div className="container-wide relative z-10">
        <div className="cta-content max-w-3xl mx-auto text-center" style={{ opacity: 0 }}>
          <h2
            className="font-display font-bold text-cream mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.0', letterSpacing: '-0.04em' }}
          >
            Real customers.
            <br />
            <span style={{ color: '#EAB308' }}>Real data.</span>
            <br />
            Real growth.
          </h2>

          <p
            className="max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.1rem)', color: '#7A9EBB' }}
          >
            If your brand is ready to acquire customers at scale, validate in market and build the proof that opens retail doors - apply to become an ADC brand partner.
          </p>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-partner-modal'))}
            className="btn-primary"
            style={{ fontSize: '15px', padding: '16px 36px' }}
          >
            Become a brand partner
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

