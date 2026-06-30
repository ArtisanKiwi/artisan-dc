'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { title: "You're building a consumer brand", body: 'Food, beverage, pantry, snacking, baby, wellness or premium consumer goods.' },
  { title: 'You want customers, not impressions', body: 'You need real buyers, real feedback and repeat purchase potential.' },
  { title: 'You need data before you scale', body: 'You want first-party data built from real customer interactions, not assumptions.' },
  { title: "You're preparing for retail", body: 'You need velocity, validation and demand proof before bigger ranging conversations.' },
]

export default function ForBrands() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo('.fb-header', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.fb-header', start: 'top 82%' } })
      gsap.fromTo('.fb-card', { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.fb-cards', start: 'top 78%' } })
      gsap.fromTo('.fb-cta', { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.fb-cta', start: 'top 88%' } })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="for-brands" className="section-pad" style={{ background: '#0D1B2A' }}>
      <div className="container-wide">
        <div className="fb-header mb-6" style={{ opacity: 0 }}>
          <h2
            className="font-display font-bold text-cream mb-5"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
          >
            Built for founders who are done
            <br />
            <span style={{ color: '#EAB308' }}>waiting for permission</span> to grow.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#96B0C8' }}>
            If you&apos;ve got a product customers need to try, ADC gives you a way to get it into their hands, learn what works and build the proof to scale.
          </p>
        </div>

        <div className="fb-cards grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {cards.map((c, i) => (
            <div key={i} className="fb-card feature-card" style={{ opacity: 0 }}>
              <h3 className="font-display font-semibold text-cream mb-2 text-base">{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#7A9EBB' }}>{c.body}</p>
            </div>
          ))}
        </div>

        <div className="fb-cta" style={{ opacity: 0 }}>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-partner-modal'))} className="btn-primary" style={{ fontSize: '15px', padding: '16px 36px' }}>
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
