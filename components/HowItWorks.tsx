'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const steps = [
  {
    tagline: '01 / Launch',
    heading: 'Launch across 100+ locations',
    description: 'Your brand goes live across selected shows, markets, events and mall activations chosen for audience fit, footfall and commercial potential.',
    image: '/launch.png',
  },
  {
    tagline: '02 / Sell',
    heading: 'Direct sales from day one',
    description: 'Trained teams sample, educate and sell your product directly to high-intent buyers in person. Real revenue, no middlemen.',
    image: '/sell.jpg',
  },
  {
    tagline: '03 / Capture',
    heading: 'Build your customer data asset',
    description: 'Every interaction builds your owned customer data, including emails, preferences, purchase behaviour and product feedback.',
    image: '/capture.png',
  },
  {
    tagline: '04 / Retain',
    heading: 'Turn buyers into repeat customers',
    description: 'Captured data feeds remarketing, ecommerce growth and repeat purchase from customers who already know your brand.',
    image: '/retain.png',
  },
  {
    tagline: '05 / Scale',
    heading: 'Scale with proof behind you',
    description: 'Live sales, customer feedback and velocity data give your brand the proof needed to grow across ecommerce, wholesale and retail.',
    image: '/scale.jpg',
  },
]

export default function HowItWorks() {
  const [activeSection, setActiveSection] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const headingBlockRef = useRef<HTMLDivElement>(null)
  const [firstStepPadTop, setFirstStepPadTop] = useState<string>('clamp(4rem, 12vh, 7rem)')

  useEffect(() => {
    const measure = () => {
      if (!headingBlockRef.current) return
      const stickyPadTop = Math.min(Math.max(window.innerHeight * 0.12, 64), 112)
      const headingHeight = headingBlockRef.current.offsetHeight
      const mb5 = 20
      setFirstStepPadTop(`${stickyPadTop + headingHeight + mb5}px`)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const bottom = rect.bottom + window.scrollY
        if (viewportCenter >= top && viewportCenter < bottom) {
          setActiveSection(i)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="how-it-works" className="px-[5%]" style={{ background: '#102945' }}>
      <div className="container-wide">
        <div className="relative grid gap-x-12 pb-16 sm:gap-y-12 md:grid-cols-2 md:pb-0 lg:gap-x-20">

          {/* Left: sticky column — heading + image together */}
          <div className="sticky top-0 hidden h-screen md:flex md:flex-col" style={{ paddingTop: 'clamp(4rem, 12vh, 7rem)', paddingBottom: 'clamp(2rem, 8vh, 4rem)' }}>
            <div className="mb-5 shrink-0" ref={headingBlockRef}>
              <h2
                className="font-display font-bold text-cream mb-2"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
              >
                How it Works
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#96B0C8' }}>
                Five steps from launch to scale.
              </p>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2' }}>
              {steps.map((step, i) => (
                <img
                  key={i}
                  src={step.image}
                  alt={step.heading}
                  className={clsx(
                    'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
                    { 'opacity-100': activeSection === i, 'opacity-0': activeSection !== i }
                  )}
                />
              ))}
            </div>
          </div>

          {/* Right: scrollable step content */}
          <div className="grid grid-cols-1 gap-0 md:block">
            {/* Mobile heading */}
            <div className="md:hidden pt-10 mb-6">
              <h2
                className="font-display font-bold text-cream mb-2"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
              >
                How it Works
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#96B0C8' }}>Five steps from launch to scale.</p>
            </div>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={el => { stepRefs.current[i] = el }}
                className="flex flex-col items-start justify-start md:h-screen"
                style={{ paddingTop: i === 0 ? firstStepPadTop : 'clamp(2rem, 8vh, 4rem)', paddingBottom: 'clamp(2rem, 8vh, 4rem)' }}
              >
                <p className="mb-3 text-[11px] uppercase tracking-widest font-semibold md:mb-4" style={{ color: '#EAB308' }}>
                  {step.tagline}
                </p>
                <h2
                  className="mb-5 font-display font-bold text-cream md:mb-6"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
                >
                  {step.heading}
                </h2>
                <p style={{ color: '#96B0C8', lineHeight: '1.7' }}>{step.description}</p>

                {/* Mobile image */}
                <div className="mt-8 block w-full md:hidden rounded-xl overflow-hidden" style={{ aspectRatio: '3/2' }}>
                  <img src={step.image} alt={step.heading} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
