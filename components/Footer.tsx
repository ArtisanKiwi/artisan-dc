'use client'

import Image from 'next/image'

function openModal() {
  window.dispatchEvent(new CustomEvent('open-partner-modal'))
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(65,90,119,0.2)', background: '#0D1B2A' }}>
      <div className="container-wide py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <Image src="/logo.png" alt="Artisan DC" width={120} height={40} className="h-8 w-auto filter invert mb-4" />
            <p className="text-sm leading-relaxed" style={{ color: '#7A9EBB' }}>
              The customer acquisition platform helping challenger consumer brands scale across Australia and New Zealand.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest mb-4 font-medium" style={{ color: '#6B8FA8' }}>Platform</p>
              <div className="flex flex-col gap-3">
                {['How It Works', 'For Brands', 'Results', 'The Advantage'].map((l) => (
                  <a key={l} href="#" className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-4 font-medium" style={{ color: '#6B8FA8' }}>Company</p>
              <div className="flex flex-col gap-3">
                {['About ADC'].map((l) => (
                  <a key={l} href="#" className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-4 font-medium" style={{ color: '#6B8FA8' }}>Contact</p>
              <div className="flex flex-col gap-3">
                <button onClick={openModal} className="text-sm text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Brand partnerships
                </button>
                <a
                  href="https://www.linkedin.com/company/artisan-dc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-2"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(65,90,119,0.15)' }}>
          <p className="text-xs" style={{ color: '#6B8FA8' }}>
            &copy; {new Date().getFullYear()} Artisan Direct Commerce Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={openModal} className="text-xs transition-colors" style={{ color: '#6B8FA8' }}>Contact</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
