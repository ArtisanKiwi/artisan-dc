'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SolutionBridge() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo('.bridge-header', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.bridge-header', start: 'top 82%' } })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="section-pad" style={{ background: '#102945' }}>
      <div className="container-wide">
        <div className="bridge-header text-center max-w-3xl mx-auto" style={{ opacity: 0 }}>
          <p className="text-[11px] uppercase tracking-widest mb-5 font-medium" style={{ color: '#EAB308' }}>
            The ADC model
          </p>
          <h2
            className="font-display font-bold text-cream"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
          >
            A direct route to customers, sales and scale.
          </h2>
        </div>
      </div>
    </section>
  )
}
