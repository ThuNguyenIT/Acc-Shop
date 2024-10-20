import { Story } from "./story";

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
}
export interface GetCategoryResponse<T> {
    message: string;
    data: T;
}
export interface GetStoryByCategoryIdResponse<T> {
    message: string;
    data: T;
}

export interface CategoryData {
  categoryName: string;
  stories: Story[];
}