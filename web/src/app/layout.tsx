import {Space_Grotesk, IBM_Plex_Mono} from 'next/font/google'
import type {Metadata} from 'next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: 'Kyle — Portfolio',
  description: 'Kyle builds games and tools — Endless Undead and AllBrewRecipes.',
}

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full bg-ink font-display text-bone antialiased selection:bg-signal selection:text-ink">
        {children}
      </body>
    </html>
  )
}
