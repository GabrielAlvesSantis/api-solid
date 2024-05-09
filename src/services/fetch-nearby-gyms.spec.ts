import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyService } from '@/services/fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyService(gymsRepository)
  })

  it('should be able to fetch nearby gyms ', async () => {
    await gymsRepository.create({
      title: 'Academia Perto',
      description: null,
      phone: null,
      latitude: -22.8932063,
      longitude: -47.0648155,
    })

    await gymsRepository.create({
      title: 'Academia Longe',
      description: null,
      phone: null,
      latitude: -23.1991096,
      longitude: -46.8904,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.8932063,
      userLongitude: -47.0648155,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia Perto',
      }),
    ])
  })
})
