import { it, describe, expect, beforeEach } from 'vitest'
import { SearchGymsService } from '@/services/search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to search for gyms ', async () => {
    await gymsRepository.create({
      title: 'Academia do Código',
      description: null,
      phone: null,
      latitude: new Decimal(-22.984564).toNumber(),
      longitude: new Decimal(-46.984614).toNumber(),
    })

    await gymsRepository.create({
      title: 'Academia do Teste',
      description: null,
      phone: null,
      latitude: new Decimal(-22.984564).toNumber(),
      longitude: new Decimal(-46.984614).toNumber(),
    })

    const { gyms } = await sut.execute({
      query: 'Código',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia do Código',
      }),
    ])
  })

  it('it should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia do Código ${i}`,
        description: null,
        phone: null,
        latitude: new Decimal(-22.984564).toNumber(),
        longitude: new Decimal(-46.984614).toNumber(),
      })
    }

    const { gyms } = await sut.execute({
      query: 'Código',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia do Código 21',
      }),
      expect.objectContaining({
        title: 'Academia do Código 22',
      }),
    ])
  })
})
