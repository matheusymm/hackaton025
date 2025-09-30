import { PrismaClient } from "@prisma/client";
import { UserMetrics } from "../domain/UserMetrics";
import { UserMetricsRepository } from "./UserMetricRepository";

export class PrismaUserMetricsRepository implements UserMetricsRepository {
    constructor(private readonly prismaClient: PrismaClient){   }
    
    async create(user: UserMetrics): Promise<void> {
            try {
                await this.prismaClient.userMetrics.create({data: user})
            } catch (error) {
                console.log('There was a error while creating user metrics:\n', error)
            }
        }
    
        async getByUser(id: String){
            return await this.prismaClient.userMetrics.findUnique({
                where: { userId: id }
            })
        }
}