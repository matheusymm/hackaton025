import { UserMetrics } from "../domain/UserMetrics"

export interface UserMetricsServices {
  create: (user: UserMetrics) => Promise<void>
  getByUser: (userId: string) => Promise<UserMetrics | null>
}