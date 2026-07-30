'use client'

export default function Problem() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28" style={{ background: '#0D1B2A' }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">

          <h2
            className="font-display font-bold text-cream"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
          >
            Traditional retail is broken.
          </h2>

          <div className="space-y-5 text-base leading-relaxed" style={{ color: '#96B0C8' }}>
            <p>Launching a consumer brand has never been easier.</p>
            <p className="font-semibold text-cream" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)' }}>
              Scaling one has never been harder.
            </p>
            <p>Most brands don&apos;t fail because consumers don&apos;t want the product.</p>
            <p>They fail because they never own the customer relationship.</p>
            <div className="border-l-2 pl-5 space-y-2 my-6" style={{ borderColor: '#EAB308' }}>
              <p>Retail owns the customer.</p>
              <p>Advertising platforms own the audience.</p>
              <p>Research companies own the insights.</p>
            </div>
            <p className="font-semibold text-cream" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)' }}>
              ADC changes that.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
