import { Story } from "@/types";
import { create } from "zustand";

export type StoryState = {
  listStoryByCategory: Story[];
  storyDetail: Story | null;
};
export type StoryActions = {
  setStoryByCategory: (stories: Story[]) => void;
  setStoryDetail: (stories: Story) => void;
};
export const useStoryStore = create<StoryState & StoryActions>()(
  (set, get) => ({
    listStoryByCategory: [],
    storyDetail: null,
    setStoryByCategory: (stories: Story[]) => {
      set({ listStoryByCategory: stories });
    },
    setStoryDetail: (story: Story) => {
      set({ storyDetail: story });
    },
  })
);
