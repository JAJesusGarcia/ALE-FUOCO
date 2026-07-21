export type TestimonialStatus = 'pending' | 'approved' | 'rejected'

export interface Testimonial {
  id: string
  name: string
  event: string
  service: string
  comment: string
  rating: number
  status: TestimonialStatus
  createdAt: string
  reviewedAt: string | null
}

export interface PublicTestimonial {
  id: string
  name: string
  event: string
  service: string
  comment: string
  rating: number
  createdAt: string
}
