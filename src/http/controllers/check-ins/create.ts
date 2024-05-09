import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const { longitude, latitude } = createCheckInBodySchema.parse(request.body)

  const checkInService = makeCheckInService()

  await checkInService.execute({
    userLatitude: latitude,
    userId: request.user.sub,
    userLongitude: longitude,
    gymId,
  })

  return reply.status(201).send()
}
