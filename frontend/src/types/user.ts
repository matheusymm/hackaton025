export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserMetrics {
  tasksCompleted: number;
}


export interface Video {
  id: string;
  title: string;
  url: string;
}

export interface Videos {
  videos: Video[];
}