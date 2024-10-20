import { Category } from '@/types';
import { create } from 'zustand';

export type CategoryState = {
    categories: Category[];
};
export type CategoryActions = {
    setCategory: (categories: Category[]) => void;
};
export const useCategoryStore = create<CategoryState & CategoryActions>()(
    (set, get) => ({
        categories: [],
        setCategory: (categories: Category[]) => {
            set({ categories });
        },

    })
);