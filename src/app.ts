import fastify from 'fastify'
import fastifyJWT from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from '@/http/controllers/users/routes'
import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { env } from '@/env'
import { ZodError } from 'zod'
import { checkInsRoutes } from '@/http/controllers/check-ins/routes'

export const app = fastify()

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation data error',
      specs: error.format(),
    })
  }

  if (env.NODE_ENV === 'dev') {
    console.error(error)
  } else {
    // TODO: Send error to monitoring service, like DataDog/Sentry/NewRelic
  }

  reply.status(500).send({
    message: 'Internal server error',
  })
})
