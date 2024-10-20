
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Story } from '@/types';
import { StoryCard } from './story-card';


interface ISameGenreStories {
    stories: Story[];
}
export const SameGenreStories: React.FC<ISameGenreStories> = ({ stories }) => {


    return (
        <div className="mx-auto w-full text-white">
            <div className="py-4">
                <CardTitle className="text-xl text-blue-500">Cùng thể loại</CardTitle>
            </div>
            <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {stories.map((story) => (
                    <React.Fragment key={story.id}>
                        <StoryCard story={story} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
