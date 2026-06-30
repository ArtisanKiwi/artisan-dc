'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { prefix: '', value: 100, suffix: '+', label: 'Event locations', sublabel: 'across ANZ' },
  { prefix: '', value: 800, suffix: '+', label: 'Selling days', sublabel: 'annually' },
  { prefix: '', value: 5, suffix: 'M+', label: 'Customer interactions', sublabel: 'per year' },
  { prefix: '$', value: 11, suffix: 'M+', label: 'Revenue generated', sublabel: 'last 12 months' },
  { prefix: '', value: 138, suffix: '%+', label: 'Portfolio growth', sublabel: 'year on year' },
  { prefix: '', value: 65, suffix: '%', label: 'Gross margin', sublabel: 'across the platform' },
]

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const countersRef = useRef<HTMLSpanElement[]>([])

  useGSAP(
    () => {
      gsap.fromTo('.stats-heading', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-heading', start: 'top 82%' } })

      gsap.fromTo('.stat-item', { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid', start: 'top 78%',
            onEnter: () => {
              stats.forEach((stat, i) => {
                const el = countersRef.current[i]
                if (!el) return
                gsap.fromTo({ val: 0 }, { val: stat.value }, {
                  duration: 2, delay: i * 0.08, ease: 'power2.out',
                  onUpdate: function () { el.textContent = Math.round(this.targets()[0].val).toString() },
                })
              })
            },
            once: true,
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 lg:py-28" style={{ background: '#0D1B2A' }}>
      <div className="container-wide flex flex-col items-start">

        <div className="stats-heading mb-12 w-full max-w-lg md:mb-18 lg:mb-20" style={{ opacity: 0 }}>
          <h3
            className="font-display font-bold text-cream"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: '1.2', letterSpacing: '-0.03em' }}
          >
            The numbers behind the platform.
          </h3>
        </div>

        <div className="stats-grid grid w-full grid-cols-1 items-start gap-y-8 md:grid-cols-3 md:gap-x-8 lg:gap-x-12 lg:gap-y-16">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item w-full pl-8" style={{ opacity: 0, borderLeft: '2px solid rgba(65,90,119,0.4)' }}>
              <p
                className="mb-2 font-display font-bold text-cream"
                style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.3', letterSpacing: '-0.04em' }}
              >
                {stat.prefix && <span style={{ color: '#EAB308' }}>{stat.prefix}</span>}
                <span ref={el => { if (el) countersRef.current[i] = el }}>{stat.value}</span>
                <span style={{ color: '#EAB308' }}>{stat.suffix}</span>
              </p>
              <h3 className="text-base font-bold text-cream leading-snug">{stat.label}</h3>
              <p className="text-sm mt-0.5" style={{ color: '#7A9EBB' }}>{stat.sublabel}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
