import Image from 'next/image'

const logos = [
  { src: '/kiwiartisan_partner_logo.png', alt: 'Kiwi Artisan', white: false },
  { src: '/petiteeats_partner_logo.png', alt: 'Petite Eats', white: false },
  { src: '/crunchtime_partner_logo.png', alt: 'Crunch Time', white: false },
  { src: '/ironclad_partner_logo.png', alt: 'Ironclad', white: true },
  { src: '/nibblish_partner_logo.png', alt: 'Nibblish', white: false },
  { src: '/bestofthebone_partner_logo.png', alt: 'Best of the Bone', white: false },
  { src: '/edenorchard_partner_logo.png', alt: 'Eden Orchard', white: false },
  { src: '/ficandfogg_partner_logo.png', alt: 'Fic and Fogg', white: true },
  { src: '/truff_partner_logo.png', alt: 'Truff', white: true },
  { src: '/viberi_partner_logo.png', alt: 'Viberi', white: true },
]

export default function ProofBar() {
  return (
    <section
      className="overflow-hidden pt-4 pb-8 md:pt-6 md:pb-10"
      style={{ background: '#0D1B2A' }}
    >
      <div className="mb-5 w-full max-w-lg px-[5%] mx-auto">
        <p className="text-center text-sm font-bold" style={{ color: '#7A9EBB' }}>
          Brands growing through the ADC platform
        </p>
      </div>
      <div className="flex items-center">
        {[0, 1].map(clone => (
          <div key={clone} className="flex shrink-0 animate-loop-horizontally items-center">
            {logos.map((logo, i) => (
              <div key={i} className="mx-4 md:mx-6 shrink-0 flex items-center justify-center" style={{ height: '88px' }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={88}
                  className="w-auto object-contain"
                  style={{
                    maxHeight: '80px',
                    filter: logo.white ? 'brightness(0) invert(1)' : 'none',
                    opacity: logo.white ? 0.7 : 1,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
