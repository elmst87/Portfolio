'use client'

import {useState, type FormEvent, type KeyboardEvent} from 'react'

type OtherSocial = {
  id: string
  label: string
  url: string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass =
  'mt-2 w-full border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-mute/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal'

const createOtherRow = (): OtherSocial => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  label: '',
  url: '',
})

export const LeadForm = () => {
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [hasDomain, setHasDomain] = useState<'yes' | 'no' | ''>('')
  const [domain, setDomain] = useState('')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [x, setX] = useState('')
  const [otherSocials, setOtherSocials] = useState<OtherSocial[]>([])
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleKeyActivate = (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    action()
  }

  const handleAddOther = () => {
    setOtherSocials((current) => [...current, createOtherRow()])
  }

  const handleRemoveOther = (id: string) => {
    setOtherSocials((current) => current.filter((row) => row.id !== id))
  }

  const handleOtherChange = (
    id: string,
    field: 'label' | 'url',
    value: string,
  ) => {
    setOtherSocials((current) =>
      current.map((row) => (row.id === id ? {...row, [field]: value} : row)),
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    if (!hasDomain) {
      setStatus('error')
      setErrorMessage('Please tell us if you already have a domain.')
      return
    }

    const payload = {
      name,
      business,
      email,
      phone,
      hasDomain,
      domain,
      facebook,
      instagram,
      x,
      otherSocials: otherSocials.map(({label, url}) => ({label, url})),
      notes,
    }

    const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'

    if (isStaticExport) {
      const subject = encodeURIComponent(`New website lead: ${business.trim()}`)
      const otherLines = payload.otherSocials
        .filter((item) => item.label.trim() && item.url.trim())
        .map((item) => `${item.label}: ${item.url}`)
        .join('\n')
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Business: ${business}`,
          `Email: ${email}`,
          `Phone: ${phone || '—'}`,
          `Has domain: ${hasDomain}`,
          `Domain: ${domain || '—'}`,
          '',
          'Socials:',
          `Facebook: ${facebook || '—'}`,
          `Instagram: ${instagram || '—'}`,
          `X: ${x || '—'}`,
          otherLines ? `Other:\n${otherLines}` : 'Other: —',
          '',
          `Notes: ${notes || '—'}`,
        ].join('\n'),
      )
      window.location.href = `mailto:elmst87@gmail.com?subject=${subject}&body=${body}`
      setStatus('success')
      return
    }

    try {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
      const response = await fetch(`${basePath}/api/lead`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as {error?: string}

      if (!response.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setName('')
      setBusiness('')
      setEmail('')
      setPhone('')
      setHasDomain('')
      setDomain('')
      setFacebook('')
      setInstagram('')
      setX('')
      setOtherSocials([])
      setNotes('')
    } catch {
      setStatus('error')
      setErrorMessage('Could not send right now. Please email elmst87@gmail.com.')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-signal/40 bg-signal/5 px-6 py-8">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-bone">
          Request received
        </h2>
        <p className="mt-3 text-base leading-relaxed text-mute">
          Thanks — I’ll email you the website setup tutorial and next steps
          soon.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          tabIndex={0}
          aria-label="Submit another request"
          onClick={() => setStatus('idle')}
          onKeyDown={(event) =>
            handleKeyActivate(event, () => setStatus('idle'))
          }
        >
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
      <label className="block">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
          Your name *
        </span>
        <input
          required
          name="name"
          autoComplete="name"
          className={fieldClass}
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-label="Your name"
        />
      </label>

      <label className="block">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
          Business name *
        </span>
        <input
          required
          name="business"
          autoComplete="organization"
          className={fieldClass}
          value={business}
          onChange={(event) => setBusiness(event.target.value)}
          aria-label="Business name"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
            Email *
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={fieldClass}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Email address"
          />
        </label>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
            Phone
          </span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className={fieldClass}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            aria-label="Phone number"
          />
        </label>
      </div>

      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
          Do you already have a domain? *
        </legend>
        <div className="mt-3 flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-bone">
            <input
              type="radio"
              name="hasDomain"
              value="yes"
              checked={hasDomain === 'yes'}
              onChange={() => setHasDomain('yes')}
              aria-label="Yes, I have a domain"
            />
            Yes
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-bone">
            <input
              type="radio"
              name="hasDomain"
              value="no"
              checked={hasDomain === 'no'}
              onChange={() => setHasDomain('no')}
              aria-label="No, I need a domain"
            />
            No
          </label>
        </div>
      </fieldset>

      {hasDomain === 'yes' ? (
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
            Your domain
          </span>
          <input
            type="text"
            name="domain"
            placeholder="yourbusiness.com"
            className={fieldClass}
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            aria-label="Existing domain name"
          />
        </label>
      ) : null}

      <fieldset className="border border-bone/15 px-5 py-5">
        <legend className="px-2 font-mono text-xs uppercase tracking-[0.18em] text-mute">
          Business social media
        </legend>
        <p className="text-sm text-mute">
          Optional — paste profile links if you have them.
        </p>

        <div className="mt-5 grid gap-5">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
              Facebook
            </span>
            <input
              type="url"
              name="facebook"
              placeholder="https://facebook.com/yourbusiness"
              className={fieldClass}
              value={facebook}
              onChange={(event) => setFacebook(event.target.value)}
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
              placeholder="https://instagram.com/yourbusiness"
              className={fieldClass}
              value={instagram}
              onChange={(event) => setInstagram(event.target.value)}
              aria-label="Instagram profile URL"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
              X
            </span>
            <input
              type="url"
              name="x"
              placeholder="https://x.com/yourbusiness"
              className={fieldClass}
              value={x}
              onChange={(event) => setX(event.target.value)}
              aria-label="X profile URL"
            />
          </label>
        </div>

        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
            Other
          </p>
          <div className="mt-3 grid gap-4">
            {otherSocials.map((row) => (
              <div
                key={row.id}
                className="grid gap-3 border border-bone/10 p-4 sm:grid-cols-[1fr_1.4fr_auto]"
              >
                <label className="block">
                  <span className="sr-only">Other network name</span>
                  <input
                    type="text"
                    placeholder="TikTok, YouTube, etc."
                    className={fieldClass}
                    value={row.label}
                    onChange={(event) =>
                      handleOtherChange(row.id, 'label', event.target.value)
                    }
                    aria-label="Other social network name"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Other network URL</span>
                  <input
                    type="url"
                    placeholder="https://..."
                    className={fieldClass}
                    value={row.url}
                    onChange={(event) =>
                      handleOtherChange(row.id, 'url', event.target.value)
                    }
                    aria-label="Other social network URL"
                  />
                </label>
                <button
                  type="button"
                  className="self-end border-b border-bone/30 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-mute transition hover:border-brew hover:text-brew focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brew"
                  tabIndex={0}
                  aria-label="Remove other social row"
                  onClick={() => handleRemoveOther(row.id)}
                  onKeyDown={(event) =>
                    handleKeyActivate(event, () => handleRemoveOther(row.id))
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 border-b border-signal pb-1 text-sm font-semibold uppercase tracking-[0.14em] text-signal transition hover:border-bone hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            tabIndex={0}
            aria-label="Add another social profile"
            onClick={handleAddOther}
            onKeyDown={(event) => handleKeyActivate(event, handleAddOther)}
          >
            + Add other
          </button>
        </div>
      </fieldset>

      <label className="block">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
          Anything else?
        </span>
        <textarea
          name="notes"
          rows={4}
          className={fieldClass}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          aria-label="Additional notes"
          placeholder="What kind of site do you need?"
        />
      </label>

      {status === 'error' ? (
        <p className="text-sm text-brew" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="inline-flex w-fit items-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal disabled:cursor-not-allowed disabled:opacity-50"
        tabIndex={0}
        aria-label="Submit website request"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Request the tutorial'}
      </button>
    </form>
  )
}
