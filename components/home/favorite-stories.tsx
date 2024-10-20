import { Story } from "@/types";
import React from "react";
import { StoryCard } from "../story/story-card";
import { DynamicTitleSection } from "./dynamic-title-section";

interface IFavoriteStories {
  stories: Story[];
}
export const FavoriteStories: React.FC<IFavoriteStories> = ({ stories }) => {
  return (
    <div className='container mx-auto pl-0 pr-0'>
      <DynamicTitleSection
        title={"Truyện hot"}
        href={"/list/truyen-hot"}
        linkText='Xem thêm'
      />
      <div className='grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
        {stories.map((story) => (
          <React.Fragment key={story.id}>
            <StoryCard story={story} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
