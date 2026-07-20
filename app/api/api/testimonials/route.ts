import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

import {
  getApprovedTestimonials,
  saveTestimonial,
} from '@/lib/testimonials/store'

import {
  sendModerationEmail,
} from '@/lib/testimonials/send-moderation-email'

import {
  validateTestimonialInput,
} from '@/lib/testimonials/validation'

import type {
  Testimonial,
} from '@/lib/testimonials/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const testimonials =
      await getApprovedTestimonials()

    return NextResponse.json(
      {
        testimonials,
      },
      {
        headers: {
          'Cache-Control':
            'no-store, max-age=0',
        },
      },
    )
  } catch (error) {
    console.error(
      'Error leyendo testimonios:',
      error,
    )

    return NextResponse.json(
      {
        testimonials: [],
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  }
}

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json()

    /*
     * Honeypot:
     * este campo debe quedar vacío.
     */
    if (
      typeof body.website === 'string' &&
      body.website.length > 0
    ) {
      return NextResponse.json({
        success: true,
      })
    }

    /*
     * Evita envíos instantáneos de bots.
     */
    const startedAt = Number(body.startedAt)
    const elapsed = Date.now() - startedAt

    if (
      !Number.isFinite(startedAt) ||
      elapsed < 2500
    ) {
      return NextResponse.json(
        {
          error:
            'No fue posible procesar el envío.',
        },
        {
          status: 400,
        },
      )
    }

    const validation =
      validateTestimonialInput(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error,
        },
        {
          status: 400,
        },
      )
    }

    const testimonial: Testimonial = {
      id: randomUUID(),
      ...validation.data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      reviewedAt: null,
    }

    await saveTestimonial(testimonial)

    try {
      await sendModerationEmail(testimonial)
    } catch (emailError) {
      /*
       * El comentario ya quedó guardado.
       * No lo eliminamos si falla el correo.
       */
      console.error(
        'Error enviando notificación:',
        emailError,
      )
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Tu experiencia fue enviada y quedó pendiente de revisión.',
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error(
      'Error enviando testimonio:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Ocurrió un error. Intentá nuevamente.',
      },
      {
        status: 500,
      },
    )
  }
}