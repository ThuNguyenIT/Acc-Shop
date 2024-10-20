import { Story } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface IStoryCard {
  story: Story;
}
export const StoryCard: React.FC<IStoryCard> = ({ story }) => {
  return (
    <div key={story.id} className='overflow-hidden'>
      <div>
        <div className='flex space-x-4'>
          <Image
            src={story.cover_image || "/images/placeholder1.png"}
            alt={story.title}
            width={80}
            height={100}
            className='object-cover image-story'
          />
          <div className='space-y-1 detail-story'>
            <Link
              href={`/story/${story.slug}`}
              className='line-clamp-1 font-normal text-black'
            >
              {story.title}
            </Link>
            <p className='text-sm font-normal leading-18px text-gray-600 '>
              {story.author?.name}
            </p>
            <p className='text-sm font-normal text-gray-600'>
              Chương {story.total_chapter}
            </p>
            <span className='text-13px italic text-gray-600'>
              Cập nhật:{" "}
              {new Date(story.updated_at ?? new Date()).toLocaleDateString(
                "vi-VN"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
