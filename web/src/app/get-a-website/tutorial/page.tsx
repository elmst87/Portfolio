import type {Metadata} from 'next'
import Link from 'next/link'
import {DomainTutorial} from '@/components/DomainTutorial'

export const metadata: Metadata = {
  title: 'Website setup tutorial — Kyle',
  description:
    'Step-by-step website setup: domain, hosting, accounts, optional Sanity, and social links.',
}

export default function WebsiteTutorialPage() {
  const year = new Date().getFullYear()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-black">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.22em] text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            tabIndex={0}
            aria-label="Kyle home"
          >
            Kyle
          </Link>
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.18em]">
            <Link
              href="/get-a-website"
              className="text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              tabIndex={0}
              aria-label="Request a website"
            >
              Request
            </Link>
            <span className="text-white" aria-current="page">
              Tutorial
            </span>
          </div>
        </nav>
      </header>

      <main className="px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
            Setup tutorial
          </p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            From domain to launch
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            Follow these steps at your own pace. When you’re done, email me and
            we’ll build the site.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-bone/10 pt-16 md:mt-20 md:pt-20">
          <DomainTutorial />
        </div>
      </main>

      <footer className="border-t border-bone/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
            © {year} Kyle
          </p>
          <Link
            href="/get-a-website"
            className="font-mono text-xs uppercase tracking-[0.2em] text-mute transition hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label="Back to website request form"
          >
            Back to request form
          </Link>
        </div>
      </footer>
    </>
  )
}
