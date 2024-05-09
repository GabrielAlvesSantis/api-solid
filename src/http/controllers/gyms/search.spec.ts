import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Unknown Gym',
        description: 'A gym for the unknowns',
        phone: '12345678999',
        latitude: -22.984564,
        longitude: -46.984614,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Lets Gym',
        description: 'A gym for the lets',
        phone: '12345678999',
        latitude: -22.984564,
        longitude: -46.984614,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Lets',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Lets Gym',
      }),
    ])
  })
})
