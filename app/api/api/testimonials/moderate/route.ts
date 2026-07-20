import { NextResponse } from 'next/server'

import {
  updateTestimonialStatus,
} from '@/lib/testimonials/store'

import {
  verifyModerationSignature,
} from '@/lib/testimonials/moderation-token'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Action = 'approve' | 'reject'

function moderationResponse(
  title: string,
  message: string,
  successful: boolean,
) {
  return new NextResponse(
    `<!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>${title}</title>
      </head>

      <body style="
        margin:0;
        min-height:100vh;
        display:grid;
        place-items:center;
        background:#151310;
        color:#f5f0e8;
        font-family:Arial,sans-serif;
      ">
        <main style="
          width:min(90%,540px);
          padding:44px;
          border:1px solid rgba(255,255,255,.1);
          background:#1d1a17;
          text-align:center;
        ">
          <div style="
            width:12px;
            height:12px;
            margin:0 auto 24px;
            border-radius:50%;
            background:${successful
              ? '#f4a15c'
              : '#8f3d34'};
            box-shadow:0 0 18px ${successful
              ? 'rgba(244,161,92,.65)'
              : 'rgba(143,61,52,.65)'};
          "></div>

          <p style="
            margin:0 0 12px;
            color:#f4a15c;
            font-size:10px;
            letter-spacing:3px;
            text-transform:uppercase;
          ">
            Ale Fuoco · Testimonials
          </p>

          <h1 style="
            margin:0;
            font-size:34px;
            font-weight:400;
          ">
            ${title}
          </h1>

          <p style="
            margin:20px 0 0;
            color:#aaa39a;
            line-height:1.7;
          ">
            ${message}
          </p>

          <a
            href="/#comentarios"
            style="
              display:inline-block;
              margin-top:30px;
              padding:14px 22px;
              border:1px solid rgba(255,255,255,.18);
              color:#f5f0e8;
              text-decoration:none;
              font-size:11px;
              letter-spacing:2px;
              text-transform:uppercase;
            "
          >
            Volver al sitio
          </a>
        </main>
      </body>
    </html>`,
    {
      status: successful ? 200 : 400,
      headers: {
        'Content-Type':
          'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    },
  )
}

export async function GET(
  request: Request,
) {
  const url = new URL(request.url)

  const id = url.searchParams.get('id')
  const action =
    url.searchParams.get('action') as Action | null
  const signature =
    url.searchParams.get('signature')

  if (
    !id ||
    !signature ||
    (action !== 'approve' &&
      action !== 'reject')
  ) {
    return moderationResponse(
      'Enlace inválido',
      'El enlace de moderación está incompleto.',
      false,
    )
  }

  const isValid =
    verifyModerationSignature(
      id,
      action,
      signature,
    )

  if (!isValid) {
    return moderationResponse(
      'Acceso rechazado',
      'La firma del enlace no es válida.',
      false,
    )
  }

  const testimonial =
    await updateTestimonialStatus(
      id,
      action === 'approve'
        ? 'approved'
        : 'rejected',
    )

  if (!testimonial) {
    return moderationResponse(
      'Comentario inexistente',
      'No encontramos ese comentario.',
      false,
    )
  }

  if (action === 'approve') {
    return moderationResponse(
      'Comentario aprobado',
      'El testimonio ya está habilitado para aparecer en la web.',
      true,
    )
  }

  return moderationResponse(
    'Comentario rechazado',
    'El testimonio fue rechazado y no aparecerá públicamente.',
    true,
  )
}