export interface TestimonialInput {
  name: string
  event: string
  service: string
  comment: string
  rating: number
}

function normalizeText(value: unknown) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function validateTestimonialInput(body: unknown):
  | {
      success: true
      data: TestimonialInput
    }
  | {
      success: false
      error: string
    } {
  if (!body || typeof body !== 'object') {
    return {
      success: false,
      error: 'Datos inválidos.',
    }
  }

  const input = body as Record<string, unknown>

  const name = normalizeText(input.name)
  const event = normalizeText(input.event)
  const service = normalizeText(input.service)
  const comment = normalizeText(input.comment)
  const rating = Number(input.rating)

  if (name.length < 2 || name.length > 80) {
    return {
      success: false,
      error: 'El nombre debe tener entre 2 y 80 caracteres.',
    }
  }

  if (event.length < 2 || event.length > 80) {
    return {
      success: false,
      error: 'Indicá el tipo de evento.',
    }
  }

  if (service.length > 100) {
    return {
      success: false,
      error: 'El servicio no puede superar los 100 caracteres.',
    }
  }

  if (comment.length < 20 || comment.length > 700) {
    return {
      success: false,
      error: 'El comentario debe tener entre 20 y 700 caracteres.',
    }
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return {
      success: false,
      error: 'La calificación debe estar entre 1 y 5.',
    }
  }

  return {
    success: true,
    data: {
      name,
      event,
      service: service || 'Producción técnica',
      comment,
      rating,
    },
  }
}
