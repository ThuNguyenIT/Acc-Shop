import { Author } from "./author";

export interface Story {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  avatar_image?: string;
  cover_image?: string;
  author_id: number;
  view_count: number;
  status?: string;
  chapter?: number;
  chapters?: Chapter[];
  total_chapter?: number;
  updated_at?: string | Date;
  author?: Author;
  category_name?: string[];
}

export interface Chapter {
  id: number;
  story_id: number;
  title: string;
  content: string;
  chapter_number: string;
  created_at: string;
  updated_at: string
}

export interface IComment {
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  avatarSrc: string;
  replies?: IComment[];
  parentAuthor?: string;
}

export interface StoryData {
  story: Story;
  chapters: Chapter[];
  hasMoreChapters: boolean;
  totalChapters: number
  currentPage: number
  totalPages: number
}

export interface GetStoryBySlugResponse<T> {
  message: string;
  data: T;
}
