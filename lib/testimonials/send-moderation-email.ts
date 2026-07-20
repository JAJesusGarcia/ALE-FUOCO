import { Resend } from 'resend'

import {
  createModerationSignature,
} from './moderation-token'

import type { Testimonial } from './types'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function sendModerationEmail(
  testimonial: Testimonial,
) {
  const apiKey = process.env.RESEND_API_KEY
  const adminEmail =
    process.env.TESTIMONIAL_ADMIN_EMAIL
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL
  const fromEmail =
    process.env.RESEND_FROM_EMAIL

  if (
    !apiKey ||
    !adminEmail ||
    !siteUrl ||
    !fromEmail
  ) {
    throw new Error(
      'Faltan variables de entorno para Resend.',
    )
  }

  const resend = new Resend(apiKey)

  const approveSignature =
    createModerationSignature(
      testimonial.id,
      'approve',
    )

  const rejectSignature =
    createModerationSignature(
      testimonial.id,
      'reject',
    )

  const approveUrl = new URL(
    '/api/testimonials/moderate',
    siteUrl,
  )

  approveUrl.searchParams.set(
    'id',
    testimonial.id,
  )
  approveUrl.searchParams.set(
    'action',
    'approve',
  )
  approveUrl.searchParams.set(
    'signature',
    approveSignature,
  )

  const rejectUrl = new URL(
    '/api/testimonials/moderate',
    siteUrl,
  )

  rejectUrl.searchParams.set(
    'id',
    testimonial.id,
  )
  rejectUrl.searchParams.set(
    'action',
    'reject',
  )
  rejectUrl.searchParams.set(
    'signature',
    rejectSignature,
  )

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: `Nuevo comentario de ${testimonial.name}`,
    html: `
      <div style="
        margin:0;
        padding:40px 20px;
        background:#151310;
        color:#f5f0e8;
        font-family:Arial,sans-serif;
      ">
        <div style="
          max-width:620px;
          margin:0 auto;
          padding:36px;
          background:#1d1a17;
          border:1px solid rgba(255,255,255,.1);
        ">
          <p style="
            margin:0 0 14px;
            color:#f4a15c;
            font-size:11px;
            letter-spacing:3px;
            text-transform:uppercase;
          ">
            Nuevo testimonio pendiente
          </p>

          <h1 style="
            margin:0 0 28px;
            font-size:30px;
            font-weight:400;
          ">
            ${escapeHtml(testimonial.name)}
          </h1>

          <p style="
            color:#aaa39a;
            font-size:13px;
            line-height:1.7;
          ">
            ${escapeHtml(testimonial.event)}
            ·
            ${escapeHtml(testimonial.service)}
            ·
            ${testimonial.rating}/5
          </p>

          <blockquote style="
            margin:28px 0;
            padding:24px;
            border-left:2px solid #f4a15c;
            background:#151310;
            font-size:18px;
            line-height:1.7;
          ">
            ${escapeHtml(testimonial.comment)}
          </blockquote>

          <div style="
            display:flex;
            gap:12px;
            margin-top:30px;
          ">
            <a
              href="${approveUrl.toString()}"
              style="
                display:inline-block;
                padding:14px 22px;
                background:#f4a15c;
                color:#151310;
                text-decoration:none;
                font-size:12px;
                font-weight:bold;
                letter-spacing:1px;
                text-transform:uppercase;
              "
            >
              Aprobar
            </a>

            <a
              href="${rejectUrl.toString()}"
              style="
                display:inline-block;
                padding:14px 22px;
                border:1px solid rgba(255,255,255,.2);
                color:#f5f0e8;
                text-decoration:none;
                font-size:12px;
                letter-spacing:1px;
                text-transform:uppercase;
              "
            >
              Rechazar
            </a>
          </div>

          <p style="
            margin-top:30px;
            color:#746f68;
            font-size:11px;
            line-height:1.6;
          ">
            El comentario no será visible públicamente
            hasta que sea aprobado.
          </p>
        </div>
      </div>
    `,
  })

  if (error) {
    throw new Error(error.message)
  }
}