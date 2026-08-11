'use client'

import type {KeyboardEvent} from 'react'
import type {HostingOption} from '@/components/hosting-options'

type AccountsStepProps = {
  hosting: HostingOption
  hostDone: boolean
  githubDone: boolean
  onToggleHost: () => void
  onToggleGithub: () => void
  onBack: () => void
  onContinue: () => void
  onKeyActivate: (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => void
}

const checkButtonClass =
  'flex w-full items-start gap-4 border border-bone/20 bg-ink px-5 py-4 text-left transition hover:border-signal/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal'

export const AccountsStep = ({
  hosting,
  hostDone,
  githubDone,
  onToggleHost,
  onToggleGithub,
  onBack,
  onContinue,
  onKeyActivate,
}: AccountsStepProps) => {
  const bothDone = hostDone && githubDone

  return (
    <section aria-labelledby="accounts-heading">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
        Step 3
      </p>
      <h2
        id="accounts-heading"
        className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
      >
        Create your accounts
      </h2>
      <p className="mt-4 text-base leading-relaxed text-mute">
        Open each link, make a free account (use an email you’ll keep), then
        check them off below. You’ll own these — I just help set things up.
      </p>

      <div className="mt-10 grid gap-4">
        <div className="border border-bone/15 px-5 py-5">
          <p className="font-semibold uppercase tracking-[0.14em] text-bone">
            1. {hosting.accountLabel} account
          </p>
          <p className="mt-2 text-sm text-mute">
            This is where your site will be hosted (
            <span className="text-bone">{hosting.name}</span>).
          </p>
          <a
            href={hosting.signupUrl}
            className="mt-4 inline-flex items-center gap-2 bg-signal px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label={`Create a ${hosting.accountLabel} account`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Create {hosting.accountLabel} account
            <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className={`${checkButtonClass} mt-4 ${hostDone ? 'border-signal bg-signal/5' : ''}`}
            tabIndex={0}
            aria-pressed={hostDone}
            aria-label={`Mark ${hosting.accountLabel} account as created`}
            onClick={onToggleHost}
            onKeyDown={(event) => onKeyActivate(event, onToggleHost)}
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${hostDone ? 'border-signal bg-signal text-ink' : 'border-bone/40'}`}
              aria-hidden="true"
            >
              {hostDone ? '✓' : ''}
            </span>
            <span className="text-sm text-mute">
              I created my {hosting.accountLabel} account
            </span>
          </button>
        </div>

        <div className="border border-bone/15 px-5 py-5">
          <p className="font-semibold uppercase tracking-[0.14em] text-bone">
            2. GitHub account
          </p>
          <p className="mt-2 text-sm text-mute">
            GitHub stores your website’s code safely and connects to hosting for
            updates.
          </p>
          <a
            href="https://github.com/signup"
            className="mt-4 inline-flex items-center gap-2 bg-signal px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label="Create a GitHub account"
            target="_blank"
            rel="noopener noreferrer"
          >
            Create GitHub account
            <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className={`${checkButtonClass} mt-4 ${githubDone ? 'border-signal bg-signal/5' : ''}`}
            tabIndex={0}
            aria-pressed={githubDone}
            aria-label="Mark GitHub account as created"
            onClick={onToggleGithub}
            onKeyDown={(event) => onKeyActivate(event, onToggleGithub)}
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${githubDone ? 'border-signal bg-signal text-ink' : 'border-bone/40'}`}
              aria-hidden="true"
            >
              {githubDone ? '✓' : ''}
            </span>
            <span className="text-sm text-mute">I created my GitHub account</span>
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal disabled:cursor-not-allowed disabled:opacity-40"
          tabIndex={0}
          aria-label="Continue after creating accounts"
          disabled={!bothDone}
          onClick={onContinue}
          onKeyDown={(event) => onKeyActivate(event, onContinue)}
        >
          Continue
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          tabIndex={0}
          aria-label="Go back to hosting"
          onClick={onBack}
          onKeyDown={(event) => onKeyActivate(event, onBack)}
        >
          ← Back
        </button>
      </div>
    </section>
  )
}
