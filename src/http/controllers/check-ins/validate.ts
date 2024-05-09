import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidateCheckService } from '@/services/factories/make-validate-check-service'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInService = makeValidateCheckService()

  await validateCheckInService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
