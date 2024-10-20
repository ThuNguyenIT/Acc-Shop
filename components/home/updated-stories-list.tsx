import { Story } from '@/types';
import React from 'react';
import { StoryCard } from '../story/story-card';
import { DynamicTitleSection } from './dynamic-title-section';

interface IUpdatedStoriesList {
  stories: Story[];
}
export const UpdatedStoriesList: React.FC<IUpdatedStoriesList> = ({ stories }) => {
  return (
    <div className="container mx-auto mt-6 px-4">
      <DynamicTitleSection
        title={'Truyện mới cập nhật'}
        href={'/list/truyen-moi'}
        linkText="Xem thêm"
      />
      <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stories.map((story) => (
          <React.Fragment key={story.id}>
            <StoryCard story={story} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
