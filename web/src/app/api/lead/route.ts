import {Resend} from 'resend'
import {NextResponse} from 'next/server'

type OtherSocial = {
  label: string
  url: string
}

type LeadPayload = {
  name: string
  business: string
  email: string
  phone?: string
  hasDomain: 'yes' | 'no'
  domain?: string
  facebook?: string
  instagram?: string
  x?: string
  otherSocials?: OtherSocial[]
  notes?: string
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.LEAD_TO_EMAIL || 'elmst87@gmail.com'
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev'

  if (!apiKey) {
    console.error('RESEND_API_KEY is missing')
    return NextResponse.json(
      {error: 'Email is not configured yet. Please try again later.'},
      {status: 500},
    )
  }

  let body: LeadPayload
  try {
    body = (await request.json()) as LeadPayload
  } catch {
    return NextResponse.json({error: 'Invalid request body.'}, {status: 400})
  }

  if (!isNonEmptyString(body.name)) {
    return NextResponse.json({error: 'Name is required.'}, {status: 400})
  }
  if (!isNonEmptyString(body.business)) {
    return NextResponse.json({error: 'Business name is required.'}, {status: 400})
  }
  if (!isNonEmptyString(body.email)) {
    return NextResponse.json({error: 'Email is required.'}, {status: 400})
  }
  if (body.hasDomain !== 'yes' && body.hasDomain !== 'no') {
    return NextResponse.json({error: 'Domain choice is required.'}, {status: 400})
  }

  const otherSocials = Array.isArray(body.otherSocials)
    ? body.otherSocials.filter(
        (item) => isNonEmptyString(item?.label) && isNonEmptyString(item?.url),
      )
    : []

  const socialRows = [
    ['Facebook', body.facebook],
    ['Instagram', body.instagram],
    ['X', body.x],
    ...otherSocials.map((item) => [item.label, item.url] as const),
  ].filter(([, url]) => isNonEmptyString(url))

  const socialHtml =
    socialRows.length > 0
      ? socialRows
          .map(
            ([label, url]) =>
              `<li><strong>${escapeHtml(String(label))}:</strong> ${escapeHtml(String(url))}</li>`,
          )
          .join('')
      : '<li>None provided</li>'

  const html = `
    <h2>New website lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.name.trim())}</p>
    <p><strong>Business:</strong> ${escapeHtml(body.business.trim())}</p>
    <p><strong>Email:</strong> ${escapeHtml(body.email.trim())}</p>
    <p><strong>Phone:</strong> ${escapeHtml(body.phone?.trim() || '—')}</p>
    <p><strong>Has domain:</strong> ${escapeHtml(body.hasDomain)}</p>
    <p><strong>Domain:</strong> ${escapeHtml(body.domain?.trim() || '—')}</p>
    <h3>Social profiles</h3>
    <ul>${socialHtml}</ul>
    <h3>Notes</h3>
    <p>${escapeHtml(body.notes?.trim() || '—')}</p>
  `

  try {
    const resend = new Resend(apiKey)
    const {error} = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: body.email.trim(),
      subject: `New website lead: ${body.business.trim()}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        {error: 'Could not send the message. Please try again.'},
        {status: 502},
      )
    }

    return NextResponse.json({ok: true})
  } catch (error) {
    console.error('Lead email failed:', error)
    return NextResponse.json(
      {error: 'Could not send the message. Please try again.'},
      {status: 500},
    )
  }
}
