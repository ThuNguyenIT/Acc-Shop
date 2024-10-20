import { Story } from "./story"

export interface IList {
    id: number,
    name: string,
    slug: string,
    description: string | null,
    created_at: string,
    updated_at: string
    stories: Story[]
}

export interface GetStoryByListResponse<T> {
    message: string;
    data: T;
}

export interface ListData {
    list: IList[];
    currentPage: number
    totalPages: number
}