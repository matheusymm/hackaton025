import { UserMetrics } from "../domain/UserMetrics";

export interface UserMetricsRepository {
    create:(UserMetrics: UserMetrics) => Promise<void>
    getByUser: (id: string) => Promise<UserMetrics[]>
}