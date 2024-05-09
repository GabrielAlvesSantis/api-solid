import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from '@/services/check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from '@/services/errors/max-number-of-check-ins-error'
import { MaxDistanceError } from '@/services/errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      description: 'Description',
      phone: '123',
      latitude: -22.984564,
      longitude: -46.984614,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: '123',
      gymId: 'gym-01',
      userLatitude: -22.984564,
      userLongitude: -46.984614,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    await sut.execute({
      userId: '123',
      gymId: 'gym-01',
      userLatitude: -22.984564,
      userLongitude: -46.984614,
    })

    await expect(() =>
      sut.execute({
        userId: '123',
        gymId: 'gym-01',
        userLatitude: -22.984564,
        userLongitude: -46.984614,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in the different days', async () => {
    vi.setSystemTime(new Date('2021-01-01 10:00:00'))
    await sut.execute({
      userId: '123',
      gymId: 'gym-01',
      userLatitude: -22.984564,
      userLongitude: -46.984614,
    })

    vi.setSystemTime(new Date('2021-01-02 10:00:00'))
    const { checkIn } = await sut.execute({
      userId: '123',
      gymId: 'gym-01',
      userLatitude: -22.984564,
      userLongitude: -46.984614,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be not able to check in gym if distance is more of 100m', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Gym 01',
      description: 'Description',
      latitude: new Decimal(-22.9780055),
      longitude: new Decimal(-46.9866954),
      phone: '123',
    })

    await expect(() =>
      sut.execute({
        userId: '123',
        gymId: 'gym-02',
        userLatitude: -22.984564,
        userLongitude: -46.984614,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
