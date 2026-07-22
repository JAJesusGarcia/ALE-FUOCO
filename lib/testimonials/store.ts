import { get, list, put } from '@vercel/blob'

import type { PublicTestimonial, Testimonial, TestimonialStatus } from './types'

const TESTIMONIALS_PREFIX = 'testimonials/'
const ACCESS = 'private' as const

function getTestimonialPath(id: string) {
  return `${TESTIMONIALS_PREFIX}${id}.json`
}

async function streamToJson<T>(stream: ReadableStream<Uint8Array>): Promise<T> {
  const text = await new Response(stream).text()

  return JSON.parse(text) as T
}

export async function saveTestimonial(testimonial: Testimonial) {
  const pathname = getTestimonialPath(testimonial.id)

  await put(pathname, JSON.stringify(testimonial, null, 2), {
    access: ACCESS,
    contentType: 'application/json',
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  })

  return testimonial
}

export async function getTestimonialById(
  id: string,
): Promise<Testimonial | null> {
  const result = await get(getTestimonialPath(id), {
    access: ACCESS,
    useCache: false,
  })

  if (!result || result.statusCode !== 200) {
    return null
  }

  return streamToJson<Testimonial>(result.stream)
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const result = await list({
    prefix: TESTIMONIALS_PREFIX,
    limit: 100,
  })

  const testimonials = await Promise.all(
    result.blobs.map(async (blob) => {
      try {
        const file = await get(blob.pathname, {
          access: ACCESS,
          useCache: false,
        })

        if (!file || file.statusCode !== 200) {
          return null
        }

        return streamToJson<Testimonial>(file.stream)
      } catch (error) {
        console.error(`Error leyendo el testimonio ${blob.pathname}:`, error)

        return null
      }
    }),
  )

  return testimonials
    .filter((testimonial): testimonial is Testimonial => testimonial !== null)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}

export async function getApprovedTestimonials(): Promise<PublicTestimonial[]> {
  const testimonials = await getAllTestimonials()

  return testimonials
    .filter((testimonial) => testimonial.status === 'approved')
    .map(({ id, name, event, service, comment, rating, createdAt }) => ({
      id,
      name,
      event,
      service,
      comment,
      rating,
      createdAt,
    }))
}

export async function updateTestimonialStatus(
  id: string,
  status: TestimonialStatus,
) {
  const testimonial = await getTestimonialById(id)

  if (!testimonial) {
    return null
  }

  const updatedTestimonial: Testimonial = {
    ...testimonial,
    status,
    reviewedAt: new Date().toISOString(),
  }

  await saveTestimonial(updatedTestimonial)

  return updatedTestimonial
}
