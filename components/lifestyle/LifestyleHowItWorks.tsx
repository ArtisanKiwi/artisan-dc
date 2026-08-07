'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

type Step = {
  tagline: string
  heading: string
  description: string
  image: string
  bullets?: string[]
}

// NOTE: steps 01 and 05 still reuse core-site placeholder images.
// Swap for Petite Eats / Ironclad activation photography once supplied.
const steps: Step[] = [
  {
    tagline: '01 / Launch',
    heading: 'Launch where your customers already are',
    description: "Deploy your brand across Australia's and New Zealand's leading lifestyle expos, wellness and outdoor events, mall activations and experiential campaigns — selected for audience fit, footfall and commercial potential.",
    image: '/launch.png',
  },
  {
    tagline: '02 / Engage',
    heading: 'Engage to generate sales and acquire customers',
    description: 'Our trained teams engage, educate and sell directly to high-intent consumers. Every activation generates immediate revenue while introducing your brand to thousands of potential long-term customers.',
    image: '/lifestyle/engage.JPG',
  },
  {
    tagline: '03 / Capture',
    heading: 'Build your customer data asset',
    description: 'Every interaction grows your first-party database through email capture, purchase behaviour, customer demographics, survey responses, product feedback and consumer preferences.',
    image: '/lifestyle/capture.png',
  },
  {
    tagline: '04 / Learn',
    heading: 'Turn customer interactions into commercial intelligence',
    description: 'Every activation generates actionable insights to improve your business.',
    bullets: [
      'SKU and sales performance',
      'Bundle and pricing optimisation',
      'Customer demographics and buying behaviour',
      'Survey insights and product feedback',
      'AI-powered sentiment analysis',
      'Product validation and NPD opportunities',
    ],
    image: '/retain.png',
  },
  {
    tagline: '05 / Nurture',
    heading: 'Build loyal customers and brand communities',
    description: 'Turn first-time buyers into repeat customers through email marketing, community building, customer feedback loops and personalised engagement. Increase customer lifetime value while creating loyal brand advocates who fuel sustainable long-term growth.',
    image: '/lifestyle/capture.png',
  },
  {
    tagline: '06 / Scale',
    heading: 'Grow with commercial proof',
    description: 'Use real customer data, sales velocity and market validation to drive demand across ecommerce, wholesale and major retail channels — backed by evidence, not assumptions.',
    image: '/lifestyle/scale.png',
  },
]

export default function LifestyleHowItWorks() {
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
                How the ADC Growth Engine Works
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#96B0C8' }}>
                Launch &gt; Sell &gt; Capture &gt; Learn &gt; Nurture &gt; Scale
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
                How the ADC Growth Engine Works
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#96B0C8' }}>Launch &gt; Sell &gt; Capture &gt; Learn &gt; Nurture &gt; Scale</p>
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

                {step.bullets && (
                  <ul className="mt-4 space-y-1.5">
                    {step.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-sm" style={{ color: '#96B0C8', lineHeight: '1.6' }}>
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: '#EAB308' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

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
