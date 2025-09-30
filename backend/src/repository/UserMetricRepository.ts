import { UserMetrics } from "../domain/UserMetrics";

export interface UserMetricsRepository {
  create: (userMetrics: UserMetrics) => Promise<void>
  getByUser: (id: string) => Promise<UserMetrics | null>
}