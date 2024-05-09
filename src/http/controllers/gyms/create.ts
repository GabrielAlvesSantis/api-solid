import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { longitude, description, latitude, phone, title } =
    createGymSchema.parse(request.body)

  const createGymService = makeCreateGymService()

  await createGymService.execute({
    longitude,
    description,
    latitude,
    phone,
    title,
  })

  return reply.status(201).send()
}
