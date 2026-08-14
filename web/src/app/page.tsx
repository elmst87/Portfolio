import Link from 'next/link'
import {HeroBackground} from '@/components/HeroBackground'
import {ProjectsSection} from '@/components/ProjectsSection'

export default function HomePage() {
  const year = new Date().getFullYear()

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
        tabIndex={0}
        aria-label="Skip to work"
      >
        Skip to work
      </a>

      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.045]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
        }}
      />

      <header className="fixed inset-x-0 top-0 z-40 bg-black">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="font-mono text-xs uppercase tracking-[0.22em] text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            tabIndex={0}
            aria-label="Kyle home"
          >
            Kyle
          </a>
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.18em]">
            <a
              href="#work"
              className="text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              tabIndex={0}
              aria-label="View work"
            >
              Work
            </a>
            <Link
              href="/get-a-website/"
              className="text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              tabIndex={0}
              aria-label="Get a website"
            >
              Get a website
            </Link>
            <a
              href="#contact"
              className="text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              tabIndex={0}
              aria-label="Contact"
            >
              Contact
            </a>
            <a
              href="https://x.com/EndlessUndead_"
              className="text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              tabIndex={0}
              aria-label="Endless Undead on X"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section
          className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-20"
          aria-labelledby="hero-name"
        >
          <HeroBackground />

          <div className="relative mx-auto w-full max-w-7xl">
            <p className="mb-6 animate-rise font-mono text-xs uppercase tracking-[0.28em] text-mute">
              Web dev - indie game dev
            </p>
            <h1
              id="hero-name"
              className="animate-rise-delay-1 max-w-[12ch] text-[clamp(3.5rem,14vw,9.5rem)] font-semibold leading-[0.85] tracking-[-0.05em]"
            >
              Kyle
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-rise-delay-2">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                tabIndex={0}
                aria-label="View selected work"
              >
                View work
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href="https://www.kongregate.com/games/elmst8/endless-undead"
                className="font-mono text-xs uppercase tracking-[0.18em] text-mute underline-offset-4 transition hover:text-signal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                tabIndex={0}
                aria-label="Play Endless Undead on Kongregate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Play Endless Undead
              </a>
            </div>
            <div
              className="mt-16 h-px origin-left animate-draw-line bg-gradient-to-r from-signal via-bone/30 to-transparent"
              aria-hidden="true"
            />
          </div>
        </section>

        <ProjectsSection />

        <section
          id="contact"
          className="border-t border-bone/10 px-5 py-20 md:px-8 md:py-28"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
            >
              Building something next?
              <span className="text-mute"> Let’s talk.</span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-6">
              <a
                href="mailto:elmst87@gmail.com"
                className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                tabIndex={0}
                aria-label="Email elmst87 at gmail.com"
              >
                elmst87@gmail.com
              </a>
              <a
                href="https://x.com/EndlessUndead_"
                className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                tabIndex={0}
                aria-label="Endless Undead on X"
                target="_blank"
                rel="noopener noreferrer"
              >
                @EndlessUndead_
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-bone/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
            © {year} Kyle
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
            Designed to be played with
          </p>
        </div>
      </footer>
    </>
  )
}
