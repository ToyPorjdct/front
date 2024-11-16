export interface Post {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    destination: string;
    maxParticipant: number;
    isClosed: boolean;
    views: number;
    likes: number;
    tags: string[];
    nickname: string;
    profileImage: string;
  }