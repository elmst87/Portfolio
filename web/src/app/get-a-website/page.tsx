import type {Metadata} from 'next'
import Link from 'next/link'
import {LeadForm} from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Get a website — Kyle',
  description:
    'Request a website setup for your small business. I’ll email you the tutorial and next steps.',
}

export default function GetAWebsitePage() {
  const year = new Date().getFullYear()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.22em] text-bone transition hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label="Kyle home"
          >
            Kyle
          </Link>
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.18em]">
            <Link
              href="/#work"
              className="text-bone/80 transition hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              tabIndex={0}
              aria-label="View work"
            >
              Work
            </Link>
            <Link
              href="/get-a-website"
              className="text-signal transition hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              tabIndex={0}
              aria-label="Get a website"
              aria-current="page"
            >
              Get a website
            </Link>
            <Link
              href="/#contact"
              className="text-bone/80 transition hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              tabIndex={0}
              aria-label="Contact"
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
            Get a website
          </p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Tell me about your business
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            Fill this out and I’ll email you the setup tutorial — domain,
            hosting, accounts, and optional Sanity — plus next steps for your
            site.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl border-t border-bone/10 pt-16 md:mt-20 md:pt-20">
          <LeadForm />
        </div>
      </main>

      <footer className="border-t border-bone/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
            © {year} Kyle
          </p>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-mute transition hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label="Back to portfolio home"
          >
            Back to portfolio
          </Link>
        </div>
      </footer>
    </>
  )
}
