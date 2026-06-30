'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@relume_io/relume-ui'
import { motion } from 'framer-motion'

const navLinks = [
  { url: '#how-it-works', title: 'How It Works' },
  { url: '#for-brands', title: 'For Brands' },
  { url: '#results', title: 'Results' },
  { url: '#contact', title: 'Contact' },
]

const topLineVariants = {
  open: { translateY: 8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
}
const middleLineVariants = {
  open: { width: 0, transition: { duration: 0.1 } },
  closed: { width: '1.5rem', transition: { delay: 0.3, duration: 0.2 } },
}
const bottomLineVariants = {
  open: { translateY: -8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
}

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 991px)')

  const openModal = () => {
    window.dispatchEvent(new CustomEvent('open-partner-modal'))
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[999] flex w-full items-center py-2 lg:py-3"
      style={{ background: 'rgba(13,27,42,0.95)', borderBottom: '1px solid rgba(65,90,119,0.2)', backdropFilter: 'blur(12px)' }}
    >
      <div className="size-full max-w-[1400px] mx-auto lg:flex lg:items-center lg:justify-between lg:px-[5%]">
        {/* Logo + hamburger row */}
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <a href="/">
            <Image src="/logo.png" alt="Artisan DC" width={160} height={54} className="h-12 w-auto filter invert" priority />
          </a>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <motion.span className="my-[3px] h-0.5 w-6" style={{ background: '#F7F3E9' }} animate={isMobileMenuOpen ? ['open', 'rotatePhase'] : 'closed'} variants={topLineVariants} />
            <motion.span className="my-[3px] h-0.5 w-6" style={{ background: '#F7F3E9' }} animate={isMobileMenuOpen ? 'open' : 'closed'} variants={middleLineVariants} />
            <motion.span className="my-[3px] h-0.5 w-6" style={{ background: '#F7F3E9' }} animate={isMobileMenuOpen ? ['open', 'rotatePhase'] : 'closed'} variants={bottomLineVariants} />
          </button>
        </div>

        {/* Nav links + CTA */}
        <motion.div
          variants={{ open: { height: 'var(--height-open, 100dvh)' }, close: { height: 'var(--height-closed, 0)' } }}
          initial="close"
          animate={isMobileMenuOpen ? 'open' : 'close'}
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
          style={isMobile ? { background: 'rgba(13,27,42,0.98)' } : {}}
        >
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="block py-3 text-sm font-medium first:pt-7 lg:px-4 lg:py-2 first:lg:pt-2"
              style={{ color: 'rgba(255,255,255,0.82)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.title}
            </a>
          ))}
          <div className="mt-6 flex flex-col items-start gap-4 pb-8 lg:ml-4 lg:mt-0 lg:flex-row lg:pb-0 lg:items-center">
            <button onClick={openModal} className="btn-primary text-sm">
              Become a brand partner
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
