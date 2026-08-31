'use client'

import Image from 'next/image'

export default function BeverageHero() {
  return (
    <section className="relative pt-12 pb-0 md:pt-16 lg:pt-20">
      {/* Full-width background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/beverage/bev_hero.png"
          alt="ADC beverage brand activation"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.75) 45%, rgba(13,27,42,0.3) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #0D1B2A, transparent)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 px-[5%]">
        <div className="container-wide">
          <div className="flex min-h-[32rem] flex-col items-start justify-center p-8 md:min-h-[44rem] md:p-16">
            <div className="w-full max-w-xl">
              <h1
                className="font-display font-bold text-cream mb-4 md:mb-5"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', lineHeight: '1.06', letterSpacing: '-0.03em' }}
              >
                The Direct Commerce Growth Platform for Consumer Beverage Brands
              </h1>
              <p
                className="mb-5 font-semibold"
                style={{ color: '#EAB308', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: '1.7', letterSpacing: '0.01em' }}
              >
                Acquire customers. Validate products. Build community. Own first-party data. Scale with confidence.
              </p>
              <p style={{ color: '#96B0C8', fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: '1.75' }}>
                ARTISAN Direct Commerce (ADC) combines live commerce, customer acquisition and commercial intelligence into one integrated platform — helping consumer brands generate revenue, build loyal customer communities, own their customer data and create the retail-ready proof needed to scale with confidence.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-partner-modal'))}
                className="btn-primary"
              >
                Become a brand partner
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <a href="#how-it-works" className="btn-outline">See how it works</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pt-2 opacity-25">
        <div className="w-px h-6 bg-gradient-to-b from-[#415A77] to-transparent" />
      </div>
    </section>
  )
}
