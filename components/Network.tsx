'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cities = [
  { name: 'Sydney', country: 'AU', active: true, description: 'Major shows, mall activations and market events' },
  { name: 'Melbourne', country: 'AU', active: true, description: 'Premium consumer events and popup kiosks' },
  { name: 'Brisbane', country: 'AU', active: true, description: 'High-growth event market with strong FMCG demand' },
  { name: 'Auckland', country: 'NZ', active: true, description: 'ADC headquarters city. Shows, markets and malls' },
  { name: 'Christchurch', country: 'NZ', active: true, description: 'Strong regional event presence and direct sales' },
  { name: 'United Kingdom', country: 'UK', active: false, description: 'Pilot market expansion underway' },
]

const channels = [
  { label: 'Consumer shows', icon: '🎪', desc: 'Ticketed consumer expos with high-intent shoppers' },
  { label: 'Farmers markets', icon: '🛒', desc: 'Weekly recurring presence building loyal local customer bases' },
  { label: 'Shopping mall activations', icon: '🏬', desc: 'High-footfall kiosks and popup retail in major centres' },
  { label: 'Corporate events', icon: '🎯', desc: 'Corporate and B2B gifting and brand activation' },
  { label: 'Food and beverage shows', icon: '🍽️', desc: 'Category-specific events with the right buyer demographic' },
]

export default function Network() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.net-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.net-header', start: 'top 82%' },
        }
      )
      gsap.fromTo(
        '.net-city',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.net-cities', start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '.net-channel',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.net-channels', start: 'top 80%' },
        }
      )
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="network" className="section-pad bg-[#0a0a0a]">
      <div className="container-wide">
        <div className="net-header mb-16" style={{ opacity: 0 }}>
          <span className="gold-line mb-6" />
          <p className="text-[11px] uppercase tracking-widest text-[#a26e24] mb-5 font-medium">
            The network
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display font-bold text-white max-w-2xl"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.03em',
              }}
            >
              100+ event locations.
              <br />
              <span className="text-[#444]">Both sides of the Tasman.</span>
            </h2>
            <p className="text-[#555] text-sm max-w-xs leading-relaxed md:text-right">
              ADC operates a scaled network of consumer-facing event sites across Australia and
              New Zealand, with UK expansion underway.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Cities */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#444] mb-6 font-medium">
              Operating cities
            </p>
            <div className="net-cities flex flex-col gap-3">
              {cities.map((city, i) => (
                <div
                  key={i}
                  className="net-city flex items-center gap-4 p-4 rounded-xl border transition-colors"
                  style={{
                    borderColor: city.active ? '#1e1e1e' : '#141414',
                    background: city.active ? '#0e0e0e' : '#0a0a0a',
                    opacity: 0,
                  }}
                >
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: city.active ? '#a26e24' : '#2a2a2a' }}
                    />
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{
                        background: city.active ? 'rgba(162,110,36,0.08)' : '#111',
                        color: city.active ? '#a26e24' : '#333',
                        border: `1px solid ${city.active ? 'rgba(162,110,36,0.15)' : '#1a1a1a'}`,
                      }}
                    >
                      {city.country}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${city.active ? 'text-white' : 'text-[#333]'}`}>
                      {city.name}
                      {!city.active && (
                        <span className="ml-2 text-[10px] text-[#333] font-normal tracking-wide">
                          Expanding
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[#444] mt-0.5 truncate">{city.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#444] mb-6 font-medium">
              Event channels
            </p>
            <div className="net-channels flex flex-col gap-3">
              {channels.map((ch, i) => (
                <div
                  key={i}
                  className="net-channel flex items-start gap-4 p-4 rounded-xl border border-[#1a1a1a] bg-[#0e0e0e]"
                  style={{ opacity: 0 }}
                >
                  <span className="text-2xl flex-shrink-0">{ch.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-white mb-1">{ch.label}</p>
                    <p className="text-xs text-[#444] leading-relaxed">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Big number callout */}
            <div
              className="mt-4 p-5 rounded-xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(31,1,110,0.15), rgba(162,110,36,0.08))',
                border: '1px solid rgba(162,110,36,0.15)',
              }}
            >
              <p
                className="font-display font-bold text-white"
                style={{ fontSize: '2.5rem', letterSpacing: '-0.04em' }}
              >
                800+
              </p>
              <p className="text-sm text-[#666] mt-1">event selling days per year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
