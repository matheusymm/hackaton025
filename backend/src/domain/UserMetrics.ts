export interface UserMetrics {
    id: string,
    lastLoggingTime?: Date,
    lastAppUseTime?: number, //seconds
    lastContentType?: string,
    lastContentCategory?: string | null,
    videosWatched: number
}