import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from '@/services/fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch User Check-in History Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(checkInRepository)
  })

  it('should be able to fetch check-in history ', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: '123',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: '123',
    })

    const { checkIns } = await sut.execute({
      userId: '123',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-02',
      }),
    ])
  })

  it('should be able to fetch paginated check-in history ', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: '123',
      })
    }

    const { checkIns } = await sut.execute({
      userId: '123',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-21',
      }),
      expect.objectContaining({
        gym_id: 'gym-22',
      }),
    ])
  })
})
