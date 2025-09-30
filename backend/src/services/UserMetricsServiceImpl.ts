import { UserMetrics } from "../domain/UserMetrics";
import { UserMetricsRepository } from "../repository/UserMetricRepository";
import { UserMetricsServices } from "./UserMetricsService";

export class UserMetricsServiceImpl implements UserMetricsServices {
    constructor(private readonly repository: UserMetricsRepository){}
    async create(user: UserMetrics): Promise<void>{
        await this.repository.create(user);
    }
    async getByUser(userId: string): Promise<UserMetrics[]>{
        return await this.repository.getByUser(userId)
    }

}