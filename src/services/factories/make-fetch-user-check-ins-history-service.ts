import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryService } from '@/services/fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(
    checkInsRepository,
  )

  return fetchUserCheckInsHistoryService
}
