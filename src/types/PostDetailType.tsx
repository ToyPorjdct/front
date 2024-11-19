import { authorType } from "./AuthorType";

export interface PostDetailType {
  id: number;
  title: string;
  description: string;
  maxParticipant: number;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  views: number;
  likes: number;
  destination: string;
  createdAt: string;
  tags: string[];
  author: authorType;
}