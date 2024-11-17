export interface PostForm {
    title: string;
    description: string;
    destination: string;
    maxParticipant: number;
    startDate: string;
    endDate: string;
    tagNames: string[];
}