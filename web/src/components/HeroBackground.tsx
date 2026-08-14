'use client'

import {useEffect, useState} from 'react'
import {pickRandomHeroClip, type HeroClip} from '@/components/hero-clips'

export const HeroBackground = () => {
  const [clip, setClip] = useState<HeroClip | null>(null)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  useEffect(() => {
    setClip(pickRandomHeroClip())
  }, [])

  if (!clip) {
    return <div className="absolute inset-0 bg-ink" aria-hidden="true" />
  }

  const poster = `${basePath}/assets/hero/${clip}.jpg`
  const video = `${basePath}/assets/hero/${clip}.mp4`

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        key={clip}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
    </div>
  )
}
