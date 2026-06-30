'use client'

import clsx from 'clsx'
import React from 'react'
import { BiCheck, BiX } from 'react-icons/bi'

type Feature = {
  text: string
  items: React.ReactNode[]
}

const features: Feature[] = [
  {
    text: 'Who owns the customer relationship',
    items: ['Brand owns every customer', 'Retailer owns the customer'],
  },
  {
    text: 'Customer data',
    items: [<BiCheck key="a" className="size-5" style={{ color: '#EAB308' }} />, <BiX key="b" className="size-5" style={{ color: '#6B8FA8' }} />],
  },
  {
    text: 'Cash flow',
    items: ['Direct from live sales', 'Net 60–90 payment terms'],
  },
  {
    text: 'Real-time product feedback',
    items: [<BiCheck key="c" className="size-5" style={{ color: '#EAB308' }} />, <BiX key="d" className="size-5" style={{ color: '#6B8FA8' }} />],
  },
  {
    text: 'Retail-ready proof of demand',
    items: [<BiCheck key="e" className="size-5" style={{ color: '#EAB308' }} />, <BiX key="f" className="size-5" style={{ color: '#6B8FA8' }} />],
  },
  {
    text: 'Event locations across ANZ',
    items: ['100+', '0'],
  },
  {
    text: 'Margins',
    items: ['Higher through direct commerce', 'Compressed by shelf fees'],
  },
]

export default function Comparison() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28" style={{ background: '#0D1B2A' }}>
      <div className="container-wide">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-[11px] uppercase tracking-widest font-medium" style={{ color: '#EAB308' }}>
            The difference
          </p>
          <h2
            className="font-display font-bold text-cream"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
          >
            Traditional retail vs. the ADC model
          </h2>
        </div>

        {/* Table */}
        <div className="mx-auto max-w-2xl">
          {/* Column headers */}
          <div
            className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] border-b"
            style={{ borderColor: 'rgba(65,90,119,0.25)' }}
          >
            <div className="hidden md:flex h-full flex-col items-start justify-end py-4 pr-6">
              <h3 className="text-sm font-semibold" style={{ color: '#7A9EBB' }}>Product comparison</h3>
            </div>

            {/* ADC — highlighted column */}
            <div
              className="flex h-full flex-col justify-between px-4 py-5 sm:px-6"
              style={{ background: 'rgba(16,41,69,0.6)', borderTop: '2px solid rgba(234,179,8,0.5)' }}
            >
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                  style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L11.5 7H16.5L12.5 10.5L14 15.5L9 12.5L4 15.5L5.5 10.5L1.5 7H6.5L9 2Z" fill="#EAB308"/>
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-cream">ADC Platform</h3>
                <p className="text-xs" style={{ color: '#96B0C8' }}>Direct commerce model</p>
              </div>
            </div>

            {/* Traditional retail */}
            <div className="flex h-full flex-col justify-between px-4 py-5 sm:px-6">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                  style={{ background: 'rgba(65,90,119,0.1)', border: '1px solid rgba(65,90,119,0.2)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="4" width="14" height="10" rx="1" stroke="#415A77" strokeWidth="1.3"/>
                    <path d="M5 4V3a3 3 0 016 0v1" stroke="#415A77" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-sm font-bold" style={{ color: '#7A9EBB' }}>Traditional Retail</h3>
                <p className="text-xs" style={{ color: '#6B8FA8' }}>Conventional distribution</p>
              </div>
            </div>
          </div>

          {/* Feature rows */}
          {features.map((feature, i) => (
            <div
              key={i}
              className="grid grid-cols-2 border-b md:grid-cols-[1.5fr_1fr_1fr]"
              style={{ borderColor: 'rgba(65,90,119,0.2)' }}
            >
              <p
                className="col-span-3 row-span-1 border-b py-4 pr-4 text-sm md:col-span-1 md:border-none md:pr-6"
                style={{ borderColor: 'rgba(65,90,119,0.2)', color: '#AABFD4' }}
              >
                {feature.text}
              </p>
              {feature.items.map((item, j) => (
                <div
                  key={j}
                  className={clsx(
                    'flex items-center justify-center px-4 py-4 text-center text-sm font-medium md:px-6',
                    j === 0
                      ? 'text-cream'
                      : ''
                  )}
                  style={j === 0
                    ? { background: 'rgba(16,41,69,0.4)', color: '#F7F3E9' }
                    : { color: '#6B8FA8' }
                  }
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}

          {/* CTA */}
          <div className="mt-10 flex items-center justify-center">
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-partner-modal'))} className="btn-primary" style={{ fontSize: '14px', padding: '13px 28px' }}>
              Become a brand partner
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
