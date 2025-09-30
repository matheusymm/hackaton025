export interface UserMetrics {
  id: string,
  userId: string,
  lastLogginTime: Date,
  lastAppUseTime: number, //seconds
  lastContentType?: string | null,
  lastContentCategory?: string | null,
  videosWatched: number
}