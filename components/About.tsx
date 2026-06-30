'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const team = [
  { name: 'Dave Thorn', role: 'Founder & CEO' },
  { name: 'Dre Hart', role: 'Executive Director, Head of Platform Sales' },
  { name: 'Andy Spear', role: 'NZ General Manager' },
  { name: 'Georgia Fenwick', role: 'Marketing Manager' },
  { name: 'Ed Sutherland', role: 'AU Sales Manager' },
  { name: 'Terese Hulls', role: 'Brand Partnerships Manager' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-left',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-left', start: 'top 82%' },
        }
      )
      gsap.fromTo(
        '.about-right',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-right', start: 'top 82%' },
        }
      )
      gsap.fromTo(
        '.team-member',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.team-grid', start: 'top 82%' },
        }
      )
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="about" className="section-pad bg-[#0a0a0a] border-t border-[#1e1e1e]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left */}
          <div className="about-left" style={{ opacity: 0 }}>
            <span className="gold-line mb-6" />
            <p className="text-[11px] uppercase tracking-widest text-[#a26e24] mb-5 font-medium">
              About ADC
            </p>
            <h2
              className="font-display font-bold text-white mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.03em',
              }}
            >
              Built by operators,
              <br />
              not consultants.
            </h2>
            <div className="space-y-4 text-[#555] leading-relaxed text-sm">
              <p>
                When COVID disrupted traditional retail, many small food and beverage brands were
                left exposed — no direct customer relationships, no data, no route to market
                outside a retailer who could delist them overnight.
              </p>
              <p>
                Kiwi Artisan was launched to give small producers a direct customer access model
                that actually worked. Through running and scaling brands ourselves, the team built
                a platform designed to validate, grow and scale brands before retail expansion —
                not instead of it.
              </p>
              <p>
                That platform became ADC. Today it&apos;s the largest direct sales network operating
                across Australia and New Zealand, recognised by Deloitte as one of the
                fastest-growing companies in New Zealand.
              </p>
              <p>Bootstrapped and profitable from day one.</p>
            </div>
          </div>

          {/* Right */}
          <div className="about-right" style={{ opacity: 0 }}>
            <p className="text-xs uppercase tracking-widest text-[#444] mb-6 font-medium">
              Leadership team
            </p>
            <div className="team-grid flex flex-col gap-3">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="team-member flex items-center gap-4 p-4 rounded-xl border border-[#1a1a1a] bg-[#0c0c0c]"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-xs"
                    style={{
                      background: 'rgba(162,110,36,0.1)',
                      border: '1px solid rgba(162,110,36,0.2)',
                      color: '#a26e24',
                    }}
                  >
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs text-[#444] mt-0.5">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Vision */}
            <div
              className="mt-6 p-5 rounded-xl"
              style={{
                background: 'rgba(31,1,110,0.12)',
                border: '1px solid rgba(31,1,110,0.2)',
              }}
            >
              <p className="text-xs text-[#333] uppercase tracking-widest mb-2 font-medium">
                Company vision
              </p>
              <p className="text-sm text-[#666] leading-relaxed italic">
                &ldquo;To build the world&apos;s leading alternative retail platform for scaling the next
                generation of consumer brands.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
