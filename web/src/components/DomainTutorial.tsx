'use client'

import {useState, type KeyboardEvent} from 'react'
import {AccountsStep} from '@/components/AccountsStep'
import {HostingStep} from '@/components/HostingStep'
import {SanityStep} from '@/components/SanityStep'
import {
  SocialProfilesStep,
  type SocialLinks,
} from '@/components/SocialProfilesStep'
import {
  HOSTING_OPTIONS,
  type HostingOptionId,
} from '@/components/hosting-options'

type TutorialStep =
  | 'domain-ask'
  | 'domain-buy'
  | 'hosting'
  | 'accounts'
  | 'sanity'
  | 'social'
  | 'done'

const emptySocialLinks: SocialLinks = {
  facebook: '',
  instagram: '',
  x: '',
}

const choiceButtonClass =
  'w-full border border-bone/20 bg-ink px-6 py-5 text-left transition hover:border-signal hover:bg-signal/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal'

export const DomainTutorial = () => {
  const [step, setStep] = useState<TutorialStep>('domain-ask')
  const [hostingId, setHostingId] = useState<HostingOptionId | null>(null)
  const [hostDone, setHostDone] = useState(false)
  const [githubDone, setGithubDone] = useState(false)
  const [wantsSanity, setWantsSanity] = useState<boolean | null>(null)
  const [sanityDone, setSanityDone] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(emptySocialLinks)
  const [socialSkipped, setSocialSkipped] = useState(false)

  const selectedHosting = HOSTING_OPTIONS.find((option) => option.id === hostingId)
  const filledSocialCount = [
    socialLinks.facebook,
    socialLinks.instagram,
    socialLinks.x,
  ].filter((value) => value.trim().length > 0).length

  const handleKeyActivate = (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    action()
  }

  const handleReset = () => {
    setStep('domain-ask')
    setHostingId(null)
    setHostDone(false)
    setGithubDone(false)
    setWantsSanity(null)
    setSanityDone(false)
    setSocialLinks(emptySocialLinks)
    setSocialSkipped(false)
  }

  const handleSocialChange = (platform: keyof SocialLinks, value: string) => {
    setSocialLinks((current) => ({...current, [platform]: value}))
    setSocialSkipped(false)
  }

  const handleChooseSanityYes = () => {
    setWantsSanity(true)
    setSanityDone(false)
  }

  const handleChooseSanityNo = () => {
    setWantsSanity(false)
    setSanityDone(false)
  }

  return (
    <div className="mx-auto max-w-2xl">
      {step === 'domain-ask' ? (
        <section aria-labelledby="domain-question">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
            Step 1
          </p>
          <h2
            id="domain-question"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
          >
            Do you already have a domain name?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mute">
            Your domain is your web address — like{' '}
            <span className="text-bone">yourbusiness.com</span>. Everything else
            builds on this.
          </p>
          <div className="mt-10 grid gap-4">
            <button
              type="button"
              className={choiceButtonClass}
              tabIndex={0}
              aria-label="Yes, I already have a domain"
              onClick={() => setStep('hosting')}
              onKeyDown={(event) =>
                handleKeyActivate(event, () => setStep('hosting'))
              }
            >
              <span className="block font-semibold uppercase tracking-[0.14em] text-signal">
                Yes — I have one
              </span>
              <span className="mt-2 block text-sm text-mute">
                Great. We’ll use the domain you already own.
              </span>
            </button>
            <button
              type="button"
              className={choiceButtonClass}
              tabIndex={0}
              aria-label="No, I need to buy a domain"
              onClick={() => setStep('domain-buy')}
              onKeyDown={(event) =>
                handleKeyActivate(event, () => setStep('domain-buy'))
              }
            >
              <span className="block font-semibold uppercase tracking-[0.14em] text-brew">
                No — I need one
              </span>
              <span className="mt-2 block text-sm text-mute">
                I’ll point you to the best place to buy one without getting
                overcharged.
              </span>
            </button>
          </div>
        </section>
      ) : null}

      {step === 'domain-buy' ? (
        <section aria-labelledby="buy-domain-heading">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
            Step 1 · Buy a domain
          </p>
          <h2
            id="buy-domain-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
          >
            Get your domain at Cloudflare
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mute">
            Skip GoDaddy-style “cheap first year, expensive forever” pricing.
            <span className="text-bone"> Cloudflare Registrar </span>
            sells domains at cost — the renewal stays about the same as year one.
            That’s usually the cheapest honest option.
          </p>

          <ol className="mt-8 space-y-4 text-base leading-relaxed text-mute">
            <li className="border-l border-signal/40 pl-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                1
              </span>
              <p className="mt-1 text-bone">
                Create a free Cloudflare account and open Registrar.
              </p>
            </li>
            <li className="border-l border-signal/40 pl-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                2
              </span>
              <p className="mt-1 text-bone">
                Search for your business name (aim for a simple{' '}
                <span className="text-mute">.com</span> when it’s available).
              </p>
            </li>
            <li className="border-l border-signal/40 pl-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                3
              </span>
              <p className="mt-1 text-bone">
                Buy only the domain — turn down hosting, email, and “security”
                upsells you don’t need yet.
              </p>
            </li>
          </ol>

          <div className="mt-8 border border-bone/15 px-5 py-4 text-sm leading-relaxed text-mute">
            Prefer a simpler checkout?{' '}
            <a
              href="https://porkbun.com/"
              className="text-brew underline-offset-4 transition hover:text-bone hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brew"
              tabIndex={0}
              aria-label="Buy a domain at Porkbun"
              target="_blank"
              rel="noopener noreferrer"
            >
              Porkbun
            </a>{' '}
            is nearly as cheap, with flat renewals and an easy interface. Still
            avoid GoDaddy for long-term cost.
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.cloudflare.com/products/registrar/"
              className="inline-flex items-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              tabIndex={0}
              aria-label="Open Cloudflare Registrar to buy a domain"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy on Cloudflare
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              tabIndex={0}
              aria-label="I bought my domain, continue to hosting"
              onClick={() => setStep('hosting')}
              onKeyDown={(event) =>
                handleKeyActivate(event, () => setStep('hosting'))
              }
            >
              I bought it — continue
            </button>
          </div>

          <button
            type="button"
            className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-mute transition hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label="Go back to domain question"
            onClick={() => setStep('domain-ask')}
            onKeyDown={(event) =>
              handleKeyActivate(event, () => setStep('domain-ask'))
            }
          >
            ← Back
          </button>
        </section>
      ) : null}

      {step === 'hosting' ? (
        <HostingStep
          selectedId={hostingId}
          onSelect={setHostingId}
          onBack={() => setStep('domain-ask')}
          onContinue={() => {
            if (!hostingId) return
            setHostDone(false)
            setGithubDone(false)
            setStep('accounts')
          }}
          onKeyActivate={handleKeyActivate}
        />
      ) : null}

      {step === 'accounts' && selectedHosting ? (
        <AccountsStep
          hosting={selectedHosting}
          hostDone={hostDone}
          githubDone={githubDone}
          onToggleHost={() => setHostDone((value) => !value)}
          onToggleGithub={() => setGithubDone((value) => !value)}
          onBack={() => setStep('hosting')}
          onContinue={() => {
            setWantsSanity(null)
            setSanityDone(false)
            setStep('sanity')
          }}
          onKeyActivate={handleKeyActivate}
        />
      ) : null}

      {step === 'sanity' ? (
        <SanityStep
          wantsSanity={wantsSanity}
          sanityDone={sanityDone}
          onChooseYes={handleChooseSanityYes}
          onChooseNo={handleChooseSanityNo}
          onToggleSanityDone={() => setSanityDone((value) => !value)}
          onBack={() => setStep('accounts')}
          onContinue={() => setStep('social')}
          onKeyActivate={handleKeyActivate}
        />
      ) : null}

      {step === 'social' ? (
        <SocialProfilesStep
          links={socialLinks}
          onChange={handleSocialChange}
          onBack={() => setStep('sanity')}
          onContinue={() => {
            setSocialSkipped(false)
            setStep('done')
          }}
          onSkip={() => {
            setSocialLinks(emptySocialLinks)
            setSocialSkipped(true)
            setStep('done')
          }}
          onKeyActivate={handleKeyActivate}
        />
      ) : null}

      {step === 'done' ? (
        <section aria-labelledby="done-heading">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
            Setup checklist · Done
          </p>
          <h2
            id="done-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
          >
            You’re ready for the build
          </h2>
          <ul className="mt-6 space-y-2 text-base text-mute">
            <li>
              <span className="text-signal">✓</span> Domain path chosen
            </li>
            <li>
              <span className="text-signal">✓</span> Hosting:{' '}
              <span className="text-bone">
                {selectedHosting?.name ?? 'selected'}
              </span>
            </li>
            <li>
              <span className="text-signal">✓</span> {selectedHosting?.accountLabel}{' '}
              + GitHub accounts
            </li>
            <li>
              <span className="text-signal">✓</span> Sanity:{' '}
              <span className="text-bone">
                {wantsSanity ? 'yes — account created' : 'skipped (optional)'}
              </span>
            </li>
            <li>
              <span className="text-signal">✓</span> Social profiles:{' '}
              <span className="text-bone">
                {socialSkipped
                  ? 'skipped'
                  : filledSocialCount > 0
                    ? `${filledSocialCount} link${filledSocialCount === 1 ? '' : 's'} added`
                    : 'none added yet'}
              </span>
            </li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-mute">
            Email me and we’ll design the site, connect your accounts, and point
            your domain at the finished page.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:elmst87@gmail.com?subject=I%20want%20a%20new%20website"
              className="inline-flex items-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              tabIndex={0}
              aria-label="Email Kyle to start your website"
            >
              Email me to start
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              tabIndex={0}
              aria-label="Start the tutorial over"
              onClick={handleReset}
              onKeyDown={(event) => handleKeyActivate(event, handleReset)}
            >
              Start over
            </button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
