'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Loader() {
  const [showImage, setShowImage] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isGone, setIsGone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowImage(true), 400)
    const t2 = setTimeout(() => setIsExiting(true), 2000)
    const t3 = setTimeout(() => setIsGone(true), 2750)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (isGone) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-transform duration-700 ease-in-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ background: '#0D1B2A' }}
    >
      <Image
        src="/logo.png"
        alt="Artisan DC"
        width={220}
        height={75}
        priority
        className={`filter invert transition-all duration-500 ease-out ${
          showImage ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      />
    </div>
  )
}
