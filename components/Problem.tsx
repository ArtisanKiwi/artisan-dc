'use client'

const subHeadings = [
  {
    title: "You don't own the customer",
    description: 'Retail owns the relationship, the data and the repeat purchase pathway.',
  },
  {
    title: 'Margins get compressed',
    description: 'Shelf fees, co-op spend and slow payment terms erode the economics before momentum can build.',
  },
  {
    title: "You don't get real customer data",
    description: "Aggregate sales numbers don't tell you who bought, why they bought or how to bring them back.",
  },
  {
    title: 'Incumbents control the shelf',
    description: 'Retail access is gatekept, expensive and difficult to scale without proven demand.',
  },
]

export default function Problem() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28" style={{ background: '#0D1B2A' }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">

          <h2
            className="font-display font-bold text-cream"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
          >
            We&apos;re on a mission to fix a broken retail model.
          </h2>

          <div>
            <p className="mb-8 text-base leading-relaxed" style={{ color: '#96B0C8' }}>
              Most consumer brands don&apos;t fail because the product is wrong. They fail because getting in front of the right customers, owning the relationship and proving demand at scale is harder than it should be.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              {subHeadings.map((item, i) => (
                <div key={i}>
                  <h3
                    className="mb-2 font-display font-semibold text-cream"
                    style={{ fontSize: '1rem', lineHeight: '1.4' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#96B0C8' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
