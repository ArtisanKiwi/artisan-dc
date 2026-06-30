'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

type AccordionItem = {
  id: number
  title: string
  body: string
  imageUrl: string
}

type InteractiveImageAccordionProps = {
  items: AccordionItem[]
  className?: string
}

function AccordionPanel({ item, isActive, onMouseEnter }: { item: AccordionItem; isActive: boolean; onMouseEnter: () => void }) {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0',
        'transition-all duration-700 ease-in-out',
        isActive ? 'flex-[4]' : 'flex-[0.4]'
      )}
      style={{ minHeight: '480px' }}
      onMouseEnter={onMouseEnter}
    >
      {/* Background image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.4) 50%, rgba(13,27,42,0.15) 100%)' }}
      />

      {/* Gold top line when active */}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)' }} />
      )}

      {/* Inactive: vertical label */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-sm font-semibold tracking-wide whitespace-nowrap"
            style={{ color: 'rgba(247,243,233,0.7)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {item.title}
          </span>
        </div>
      )}

      {/* Active: content at bottom */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-[11px] uppercase tracking-widest mb-3 font-medium" style={{ color: '#D4AF37' }}>
            0{item.id}
          </p>
          <h3
            className="font-display font-bold text-cream mb-3"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.025em', lineHeight: '1.1' }}
          >
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(247,243,233,0.75)' }}>
            {item.body}
          </p>
        </div>
      )}
    </div>
  )
}

export function InteractiveImageAccordion({ items, className }: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className={cn('flex flex-row gap-3 w-full', className)} style={{ height: '480px' }}>
      {items.map((item, index) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  )
}
