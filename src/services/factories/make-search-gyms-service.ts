import { SearchGymsService } from '@/services/search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymsService = new SearchGymsService(gymsRepository)

  return searchGymsService
}
