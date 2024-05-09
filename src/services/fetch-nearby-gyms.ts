import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLongitude,
    userLatitude,
  }: FetchNearbyServiceRequest): Promise<FetchNearbyServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
