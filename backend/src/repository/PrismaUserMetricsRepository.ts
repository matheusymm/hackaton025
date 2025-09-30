import { PrismaClient } from "@prisma/client";
import { UserMetrics } from "../domain/UserMetrics";
import { UserMetricsRepository } from "./UserMetricRepository";

export class PrismaUserMetricsRepository implements UserMetricsRepository {
  constructor(private readonly prismaClient: PrismaClient) { }

  async create(userMetrics: UserMetrics): Promise<void> {
    try {
      await this.prismaClient.userMetrics.create({
        data: {
          id: userMetrics.id,
          userId: userMetrics.userId,
          lastLogginTime: userMetrics.lastLogginTime,
          lastAppUseTime: userMetrics.lastAppUseTime,
          lastContentType: userMetrics.lastContentType,
          lastContentCategory: userMetrics.lastContentCategory,
          videosWatched: userMetrics.videosWatched
        }
      })
    } catch (error) {
      console.log('There was a error while creating user metrics:\n', error)
    }
  }

  async getByUser(id: string): Promise<UserMetrics | null> {
    return await this.prismaClient.userMetrics.findFirst({
      where: { userId: id }
    })
  }
}