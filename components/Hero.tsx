'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative pt-12 pb-0 md:pt-16 lg:pt-20">
      {/* Full-width background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/hero.png"
          alt="ADC brand activation"
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
            <div className="w-full max-w-lg">
              <h1
                className="font-display font-bold text-cream mb-5 md:mb-6"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
              >
                Helping consumer brands scale across{' '}
                <span className="gold-text">Australia and New Zealand.</span>
              </h1>
              <p style={{ color: '#96B0C8', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', lineHeight: '1.7' }}>
                ADC connects emerging consumer brands with millions of customers through direct selling shows and activations. Real buyers, real data, real growth.
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
