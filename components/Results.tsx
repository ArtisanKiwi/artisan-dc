'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { BiSolidStar } from 'react-icons/bi'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)

type PhotoCard = {
  component: 'photo'
  src: string
  alt: string
}

type QuoteCard = {
  component: 'quote'
  numberOfStars: number
  quote: string
  name: string
  position: string
  companyName: string
  imageSrc: string
}

type Card = PhotoCard | QuoteCard

const cards: Card[] = [
  {
    component: 'photo',
    src: '/results_image_1.jpg',
    alt: 'Brand activation at consumer show',
  },
  {
    component: 'photo',
    src: '/results_image_2.JPG',
    alt: 'Sampling event',
  },
  {
    component: 'quote',
    numberOfStars: 5,
    quote: '"ADC gave us direct access to customers we couldn\'t reach through retail. Within three months we had 2,000 new buyers and the velocity data to start conversations with major supermarkets."',
    name: 'Brand Partner',
    position: 'Founder',
    companyName: 'Replace with brand name',
    imageSrc: '/kiwiartisan_partner_logo.png',
  },
  {
    component: 'quote',
    numberOfStars: 5,
    quote: '"The first-party data we captured through ADC activations is now the backbone of our ecommerce strategy. We know exactly who our customer is, what they buy and when they come back."',
    name: 'Brand Partner',
    position: 'Founder',
    companyName: 'Replace with brand name',
    imageSrc: '/petiteeats_partner_logo.png',
  },
  {
    component: 'photo',
    src: '/results_image_3.png',
    alt: 'Mall kiosk activation',
  },
  {
    component: 'photo',
    src: '/results_image_4.png',
    alt: 'Market event',
  },
]

export default function Results() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo('.res-header', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.res-header', start: 'top 82%' } })
      gsap.fromTo('.res-card', { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.res-grid', start: 'top 80%' } })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="results" className="section-pad" style={{ background: '#102945' }}>
      <div className="container-wide">
        <div className="res-header mb-12 text-center max-w-xl mx-auto" style={{ opacity: 0 }}>
          <h2
            className="font-display font-bold text-cream mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
          >
            What brands say.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#96B0C8' }}>
            Hear from brand partners growing through the ADC platform.
          </p>
        </div>

        <div className="res-grid grid grid-cols-1 gap-5 sm:grid-rows-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:grid-rows-2">
          {cards.map((card, i) =>
            card.component === 'photo' ? (
              <div
                key={i}
                className="res-card relative overflow-hidden rounded-xl"
                style={{ opacity: 0, aspectRatio: '3/4', minHeight: '280px' }}
              >
                <Image src={card.src} alt={card.alt} fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.4) 0%, transparent 50%)' }} />
              </div>
            ) : (
              <div
                key={i}
                className={clsx(
                  'res-card flex flex-col items-start justify-between rounded-xl p-6 sm:col-span-2 md:p-8',
                  i === 2 ? 'order-last lg:order-none' : ''
                )}
                style={{ opacity: 0, background: '#0D1B2A', border: '1px solid rgba(65,90,119,0.25)' }}
              >
                <div>
                  <div className="flex mb-5">
                    {Array(card.numberOfStars).fill(null).map((_, si) => (
                      <BiSolidStar key={si} className="size-4" style={{ color: '#EAB308' }} />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed mb-6" style={{ color: '#96B0C8' }}>
                    {card.quote}
                  </blockquote>
                </div>
                <div className="flex items-center gap-3 pt-5 w-full" style={{ borderTop: '1px solid rgba(65,90,119,0.2)' }}>
                  <Image
                    src={card.imageSrc}
                    alt={card.companyName}
                    width={48}
                    height={48}
                    className="w-10 h-10 rounded-full object-contain flex-shrink-0"
                    style={{ background: 'rgba(65,90,119,0.1)', filter: 'brightness(0) invert(1)', opacity: 0.5 }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-cream">{card.name}</p>
                    <p className="text-xs" style={{ color: '#7A9EBB' }}>
                      {card.position}, {card.companyName}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
