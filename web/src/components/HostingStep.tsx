'use client'

import type {KeyboardEvent} from 'react'
import {
  HOSTING_OPTIONS,
  type HostingOption,
  type HostingOptionId,
} from '@/components/hosting-options'

type HostingStepProps = {
  selectedId: HostingOptionId | null
  onSelect: (id: HostingOptionId) => void
  onBack: () => void
  onContinue: () => void
  onKeyActivate: (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => void
}

const choiceButtonClass =
  'w-full border border-bone/20 bg-ink px-5 py-5 text-left transition hover:border-signal/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal'

export const HostingStep = ({
  selectedId,
  onSelect,
  onBack,
  onContinue,
  onKeyActivate,
}: HostingStepProps) => {
  const selected = HOSTING_OPTIONS.find((option) => option.id === selectedId)

  return (
    <section aria-labelledby="hosting-heading">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
        Step 2
      </p>
      <h2
        id="hosting-heading"
        className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
      >
        Choose where the site will live
      </h2>
      <p className="mt-4 text-base leading-relaxed text-mute">
        Hosting is the computer that serves your website. Prices change often —
        treat the numbers below as a guide and confirm on their pricing page
        before you buy.
      </p>

      <div className="mt-10 grid gap-4">
        {HOSTING_OPTIONS.map((option) => (
          <HostingOptionCard
            key={option.id}
            option={option}
            selected={selectedId === option.id}
            onSelect={() => onSelect(option.id)}
            onKeyActivate={onKeyActivate}
            choiceButtonClass={choiceButtonClass}
          />
        ))}
      </div>

      {selected ? (
        <div className="mt-8 border border-bone/15 px-5 py-4 text-sm leading-relaxed text-mute">
          You picked <span className="text-bone">{selected.name}</span>.
          {selected.recommended
            ? ' That’s usually the best fit for sites I build.'
            : ' We can still use it — just know renewals and fit differ.'}{' '}
          Sanity (self-editing) stays <span className="text-bone">optional</span>{' '}
          no matter which host you choose.
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal disabled:cursor-not-allowed disabled:opacity-40"
          tabIndex={0}
          aria-label="Continue after choosing hosting"
          disabled={!selectedId}
          onClick={onContinue}
          onKeyDown={(event) => onKeyActivate(event, onContinue)}
        >
          Continue
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          tabIndex={0}
          aria-label="Go back"
          onClick={onBack}
          onKeyDown={(event) => onKeyActivate(event, onBack)}
        >
          ← Back
        </button>
      </div>
    </section>
  )
}

type HostingOptionCardProps = {
  option: HostingOption
  selected: boolean
  onSelect: () => void
  onKeyActivate: (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => void
  choiceButtonClass: string
}

const HostingOptionCard = ({
  option,
  selected,
  onSelect,
  onKeyActivate,
  choiceButtonClass,
}: HostingOptionCardProps) => {
  return (
    <div
      className={`${choiceButtonClass} ${selected ? 'border-signal bg-signal/5' : ''}`}
    >
      <button
        type="button"
        className="w-full text-left"
        tabIndex={0}
        aria-label={`Select ${option.name} hosting`}
        aria-pressed={selected}
        onClick={onSelect}
        onKeyDown={(event) => onKeyActivate(event, onSelect)}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="block font-semibold uppercase tracking-[0.14em] text-bone">
              {option.name}
              {option.recommended ? (
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                  Recommended
                </span>
              ) : null}
            </span>
            <span className="mt-1 block text-sm text-mute">{option.tagline}</span>
          </div>
          <div className="text-left sm:text-right">
            <span className="block font-mono text-xs uppercase tracking-[0.14em] text-signal">
              {option.priceIntro}
            </span>
            <span className="mt-1 block max-w-[16rem] text-xs text-mute">
              Renewal: {option.priceRenewal}
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm text-mute">
          <span className="text-bone">Best for:</span> {option.bestFor}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
              Pros
            </p>
            <ul className="mt-2 space-y-1 text-sm text-mute">
              {option.pros.map((item) => (
                <li key={item}>+ {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brew">
              Cons
            </p>
            <ul className="mt-2 space-y-1 text-sm text-mute">
              {option.cons.map((item) => (
                <li key={item}>− {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </button>

      <a
        href={option.url}
        className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-mute underline-offset-4 transition hover:text-signal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
        tabIndex={0}
        aria-label={`View current ${option.name} pricing`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View current pricing ↗
      </a>
    </div>
  )
}
