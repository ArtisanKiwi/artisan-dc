'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { title: 'Strategic site selection', body: 'Every location chosen for footfall, demographics and category fit.' },
  { title: 'Live selling and sampling', body: 'Trained teams convert interest into purchases at the point of experience.' },
  { title: 'First-party data capture', body: 'QR, email and behaviour data that belongs to your brand, not a retailer.' },
  { title: 'Brand storytelling', body: 'Your story told in person, at scale, by people trained to sell it.' },
  { title: 'Full event logistics', body: 'Site setup, freight and staffing. We handle operations so you don\'t have to.' },
  { title: 'Ecommerce and retail pathways', body: 'Captured data fuels remarketing and gives you the velocity proof retailers need.' },
]

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo('.wwd-header', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.wwd-header', start: 'top 82%' } })
      gsap.fromTo('.wwd-card', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '.wwd-grid', start: 'top 78%' } })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="section-pad" style={{ background: '#102945' }}>
      <div className="container-wide">
        <div className="wwd-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14" style={{ opacity: 0 }}>
          <div>
            <span className="gold-line mb-6" />
            <h2
              className="font-display font-bold text-cream"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Brands focus on brand.
              <br />ADC focuses on growth.
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed md:text-right" style={{ color: '#7A9EBB' }}>
            End-to-end delivery. You show up with great product.
            We handle everything else.
          </p>
        </div>

        <div className="wwd-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div key={i} className="wwd-card feature-card" style={{ opacity: 0, background: '#0D1B2A' }}>
              <span className="block text-[11px] font-mono mb-4 tracking-widest" style={{ color: '#6B8FA8' }}>
                0{i + 1}
              </span>
              <h3 className="font-display font-semibold text-cream mb-2 text-base">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#7A9EBB' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
