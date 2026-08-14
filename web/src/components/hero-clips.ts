export const HERO_CLIPS = [
  'mortarbattery',
  'drone',
  'mines',
  'update',
  'nerf',
] as const

export type HeroClip = (typeof HERO_CLIPS)[number]

export const pickRandomHeroClip = (): HeroClip => {
  const index = Math.floor(Math.random() * HERO_CLIPS.length)
  return HERO_CLIPS[index]
}
