export type HostingOptionId = 'cloudflare-pages' | 'hostinger' | 'bluehost'

export type HostingOption = {
  id: HostingOptionId
  name: string
  tagline: string
  priceIntro: string
  priceRenewal: string
  bestFor: string
  pros: string[]
  cons: string[]
  url: string
  signupUrl: string
  accountLabel: string
  recommended?: boolean
}

export const HOSTING_OPTIONS: HostingOption[] = [
  {
    id: 'cloudflare-pages',
    name: 'Cloudflare Pages',
    tagline: 'Modern hosting — usually free',
    priceIntro: '$0 / month',
    priceRenewal: 'Free for most small sites; paid builds from ~$20/mo if you outgrow free',
    bestFor: 'Custom sites I build for you (fast, global, no monthly hosting bill)',
    pros: [
      'Free plan covers most small-business sites',
      'Very fast worldwide (Cloudflare’s network)',
      'Pairs cleanly with a Cloudflare domain',
      'No “cheap first year, expensive renewal” hosting trap',
    ],
    cons: [
      'Not traditional cPanel / one-click WordPress hosting',
      'Best when a developer deploys the site for you',
    ],
    url: 'https://pages.cloudflare.com/',
    signupUrl: 'https://dash.cloudflare.com/sign-up',
    accountLabel: 'Cloudflare',
    recommended: true,
  },
  {
    id: 'hostinger',
    name: 'Hostinger',
    tagline: 'Budget shared hosting',
    priceIntro: 'From ~$2.99 / mo intro',
    priceRenewal: 'Often renews around ~$10.99 / mo (check current plan)',
    bestFor: 'People who want a classic hosting dashboard and long promo pricing',
    pros: [
      'Low advertised starter price',
      'Familiar shared-hosting tools',
      'Often bundles a free domain year on longer plans',
    ],
    cons: [
      'Renewal price is usually much higher than the intro rate',
      'You often pay years upfront to get the low monthly number',
      'Less ideal for modern Next.js-style sites than Pages',
    ],
    url: 'https://www.hostinger.com/pricing',
    signupUrl: 'https://www.hostinger.com/',
    accountLabel: 'Hostinger',
  },
  {
    id: 'bluehost',
    name: 'Bluehost',
    tagline: 'Beginner WordPress hosting',
    priceIntro: 'From ~$2.95–$3.99 / mo intro',
    priceRenewal: 'Often renews around ~$10.99+ / mo (check current plan)',
    bestFor: 'WordPress beginners who want a guided setup',
    pros: [
      'Simple onboarding for WordPress',
      'Widely known / beginner marketing',
      'Shared plans for small low-traffic sites',
    ],
    cons: [
      'Intro pricing jumps at renewal',
      'Performance is average on busy shared servers',
      'Easy to buy add-ons you don’t need',
    ],
    url: 'https://www.bluehost.com/pricing',
    signupUrl: 'https://www.bluehost.com/',
    accountLabel: 'Bluehost',
  },
]
