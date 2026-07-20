import crypto from 'node:crypto'

type ModerationAction = 'approve' | 'reject'

function getSecret() {
  const secret = process.env.TESTIMONIAL_MODERATION_SECRET

  if (!secret) {
    throw new Error(
      'Falta TESTIMONIAL_MODERATION_SECRET',
    )
  }

  return secret
}

export function createModerationSignature(
  testimonialId: string,
  action: ModerationAction,
) {
  return crypto
    .createHmac('sha256', getSecret())
    .update(`${testimonialId}:${action}`)
    .digest('hex')
}

export function verifyModerationSignature(
  testimonialId: string,
  action: ModerationAction,
  receivedSignature: string,
) {
  const expectedSignature = createModerationSignature(
    testimonialId,
    action,
  )

  const expectedBuffer = Buffer.from(expectedSignature)
  const receivedBuffer = Buffer.from(receivedSignature)

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(
    expectedBuffer,
    receivedBuffer,
  )
}