'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@relume_io/relume-ui'
import { FaCirclePlay } from 'react-icons/fa6'
import { CgSpinner } from 'react-icons/cg'
import clsx from 'clsx'

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10l4 4 8-8" stroke="#EAB308" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    paragraph: 'Generate revenue from day one through live, direct customer conversion.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10l4 4 8-8" stroke="#EAB308" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    paragraph: 'Build your own customer list and first-party data asset, not a retailer\'s report.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10l4 4 8-8" stroke="#EAB308" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    paragraph: 'Use live sales velocity and real customer feedback to enter retail from a position of proof.',
  },
]

export default function PlatformAdvantage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <section id="advantage" className="px-[5%] py-16 md:py-24 lg:py-28" style={{ background: '#0D1B2A' }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">

          {/* Left: content */}
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-widest font-semibold md:mb-4" style={{ color: '#EAB308' }}>
              The ADC platform
            </p>
            <h2
              className="mb-5 font-display font-bold text-cream md:mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              The advantage traditional retail can&apos;t give you.
            </h2>
            <p className="mb-5 md:mb-6" style={{ color: '#96B0C8', lineHeight: '1.7' }}>
              Retail can put your product on a shelf. ADC puts your brand in front of real customers and gives you the data, sales and proof to keep growing.
            </p>
            <ul className="grid grid-cols-1 gap-4 py-2">
              {features.map((f, i) => (
                <li key={i} className="flex self-start">
                  <div className="mr-4 flex-none self-start pt-0.5">{f.icon}</div>
                  <p style={{ color: '#96B0C8' }}>{f.paragraph}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 md:mt-8">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-partner-modal'))}
                className="btn-primary"
              >
                Become a brand partner
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right: video dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto', border: '1px solid rgba(65,90,119,0.3)' }}>
                <video
                  src="/Sydney_Royal_Short_Fast_Cut2.MOV"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute inset-0 z-10" style={{ background: 'rgba(13,27,42,0.35)' }} />
                <FaCirclePlay className="absolute z-20 size-14 text-white" style={{ opacity: 0.85 }} />
              </button>
            </DialogTrigger>
            <DialogContent>
              {!isVideoLoaded && (
                <CgSpinner className="mx-auto size-16 animate-spin text-white" />
              )}
              <video
                src="/Sydney_Royal_Short_Fast_Cut2.MOV"
                controls
                autoPlay
                className={clsx('mx-auto w-full md:w-[500px]', {
                  visible: isVideoLoaded,
                  hidden: !isVideoLoaded,
                })}
                onLoadedData={() => setIsVideoLoaded(true)}
              />
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </section>
  )
}
