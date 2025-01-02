import { authorType } from "./AuthorType";

export interface CommentType {
    id: number;
    content: string;
    createdAt: string;
    author: authorType;
  }