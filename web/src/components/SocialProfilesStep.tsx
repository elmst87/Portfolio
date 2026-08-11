'use client'

import type {ChangeEvent, KeyboardEvent} from 'react'

export type SocialLinks = {
  facebook: string
  instagram: string
  x: string
}

type SocialProfilesStepProps = {
  links: SocialLinks
  onChange: (platform: keyof SocialLinks, value: string) => void
  onBack: () => void
  onContinue: () => void
  onSkip: () => void
  onKeyActivate: (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => void
}

const fieldClass =
  'mt-2 w-full border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-mute/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal'

export const SocialProfilesStep = ({
  links,
  onChange,
  onBack,
  onContinue,
  onSkip,
  onKeyActivate,
}: SocialProfilesStepProps) => {
  const handleChange = (
    platform: keyof SocialLinks,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(platform, event.target.value)
  }

  return (
    <section aria-labelledby="social-heading">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
        Step 5 · Optional
      </p>
      <h2
        id="social-heading"
        className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
      >
        Add your social profile links
      </h2>
      <p className="mt-4 text-base leading-relaxed text-mute">
        Paste the public URLs to your pages. We’ll put them in the site footer or
        contact area — no complicated API keys needed.
      </p>

      <div className="mt-10 grid gap-6">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
            Facebook
          </span>
          <input
            type="url"
            name="facebook"
            inputMode="url"
            autoComplete="url"
            placeholder="https://facebook.com/yourbusiness"
            className={fieldClass}
            value={links.facebook}
            onChange={(event) => handleChange('facebook', event)}
            aria-label="Facebook profile URL"
          />
        </label>

        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
            Instagram
          </span>
          <input
            type="url"
            name="instagram"
            inputMode="url"
            autoComplete="url"
            placeholder="https://instagram.com/yourbusiness"
            className={fieldClass}
            value={links.instagram}
            onChange={(event) => handleChange('instagram', event)}
            aria-label="Instagram profile URL"
          />
        </label>

        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
            X (Twitter)
          </span>
          <input
            type="url"
            name="x"
            inputMode="url"
            autoComplete="url"
            placeholder="https://x.com/yourbusiness"
            className={fieldClass}
            value={links.x}
            onChange={(event) => handleChange('x', event)}
            aria-label="X profile URL"
          />
        </label>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-mute">
        Don’t have one? Leave it blank. Want posts on Facebook to update the
        website automatically later? That’s an advanced add-on we can talk about
        after launch.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          tabIndex={0}
          aria-label="Continue with social profile links"
          onClick={onContinue}
          onKeyDown={(event) => onKeyActivate(event, onContinue)}
        >
          Continue
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          tabIndex={0}
          aria-label="Skip social profile links"
          onClick={onSkip}
          onKeyDown={(event) => onKeyActivate(event, onSkip)}
        >
          Skip for now
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          tabIndex={0}
          aria-label="Go back to Sanity step"
          onClick={onBack}
          onKeyDown={(event) => onKeyActivate(event, onBack)}
        >
          ← Back
        </button>
      </div>
    </section>
  )
}
