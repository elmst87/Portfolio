'use client'

import type {KeyboardEvent} from 'react'

type SanityStepProps = {
  wantsSanity: boolean | null
  sanityDone: boolean
  onChooseYes: () => void
  onChooseNo: () => void
  onToggleSanityDone: () => void
  onBack: () => void
  onContinue: () => void
  onKeyActivate: (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => void
}

const choiceButtonClass =
  'w-full border border-bone/20 bg-ink px-6 py-5 text-left transition hover:border-signal hover:bg-signal/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal'

const checkButtonClass =
  'flex w-full items-start gap-4 border border-bone/20 bg-ink px-5 py-4 text-left transition hover:border-signal/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal'

export const SanityStep = ({
  wantsSanity,
  sanityDone,
  onChooseYes,
  onChooseNo,
  onToggleSanityDone,
  onBack,
  onContinue,
  onKeyActivate,
}: SanityStepProps) => {
  const canContinue =
    wantsSanity === false || (wantsSanity === true && sanityDone)

  return (
    <section aria-labelledby="sanity-heading">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
        Step 4 · Optional
      </p>
      <h2
        id="sanity-heading"
        className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
      >
        Want to edit your site yourself later?
      </h2>
      <p className="mt-4 text-base leading-relaxed text-mute">
        <span className="text-bone">Sanity</span> is an optional content system.
        With it, you can update text and images without calling a developer every
        time. You do <span className="text-bone">not</span> need it to launch —
        we can add it later.
      </p>

      {wantsSanity === null ? (
        <div className="mt-10 grid gap-4">
          <button
            type="button"
            className={choiceButtonClass}
            tabIndex={0}
            aria-label="Yes, I want Sanity for self-editing"
            onClick={onChooseYes}
            onKeyDown={(event) => onKeyActivate(event, onChooseYes)}
          >
            <span className="block font-semibold uppercase tracking-[0.14em] text-signal">
              Yes — set up Sanity
            </span>
            <span className="mt-2 block text-sm text-mute">
              You’ll create a Sanity account so you can edit content later.
            </span>
          </button>
          <button
            type="button"
            className={choiceButtonClass}
            tabIndex={0}
            aria-label="No, skip Sanity for now"
            onClick={onChooseNo}
            onKeyDown={(event) => onKeyActivate(event, onChooseNo)}
          >
            <span className="block font-semibold uppercase tracking-[0.14em] text-brew">
              No — skip for now
            </span>
            <span className="mt-2 block text-sm text-mute">
              Launch without it. We can always add self-editing later.
            </span>
          </button>
        </div>
      ) : null}

      {wantsSanity === true ? (
        <div className="mt-10 border border-bone/15 px-5 py-5">
          <p className="font-semibold uppercase tracking-[0.14em] text-bone">
            Create a Sanity account
          </p>
          <p className="mt-2 text-sm text-mute">
            Sign up free, then check the box when you’re done. Use the same
            email as your other accounts if you can.
          </p>
          <a
            href="https://www.sanity.io/login"
            className="mt-4 inline-flex items-center gap-2 bg-signal px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label="Create a Sanity account"
            target="_blank"
            rel="noopener noreferrer"
          >
            Create Sanity account
            <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className={`${checkButtonClass} mt-4 ${sanityDone ? 'border-signal bg-signal/5' : ''}`}
            tabIndex={0}
            aria-pressed={sanityDone}
            aria-label="Mark Sanity account as created"
            onClick={onToggleSanityDone}
            onKeyDown={(event) => onKeyActivate(event, onToggleSanityDone)}
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${sanityDone ? 'border-signal bg-signal text-ink' : 'border-bone/40'}`}
              aria-hidden="true"
            >
              {sanityDone ? '✓' : ''}
            </span>
            <span className="text-sm text-mute">I created my Sanity account</span>
          </button>
          <button
            type="button"
            className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-mute transition hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label="Change Sanity choice"
            onClick={onChooseNo}
            onKeyDown={(event) =>
              onKeyActivate(event, () => {
                onChooseNo()
              })
            }
          >
            Actually, skip Sanity →
          </button>
        </div>
      ) : null}

      {wantsSanity === false ? (
        <p className="mt-8 border border-bone/15 px-5 py-4 text-sm leading-relaxed text-mute">
          Got it — we’ll launch without Sanity. You can add self-editing later
          if you want.
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-4">
        {(wantsSanity !== null) ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal disabled:cursor-not-allowed disabled:opacity-40"
            tabIndex={0}
            aria-label="Continue after Sanity choice"
            disabled={!canContinue}
            onClick={onContinue}
            onKeyDown={(event) => onKeyActivate(event, onContinue)}
          >
            Continue
          </button>
        ) : null}
        <button
          type="button"
          className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          tabIndex={0}
          aria-label="Go back to accounts"
          onClick={onBack}
          onKeyDown={(event) => onKeyActivate(event, onBack)}
        >
          ← Back
        </button>
      </div>
    </section>
  )
}
