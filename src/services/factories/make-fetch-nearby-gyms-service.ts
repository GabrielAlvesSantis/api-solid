import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyService } from '@/services/fetch-nearby-gyms'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyService = new FetchNearbyService(gymsRepository)

  return fetchNearbyService
}
