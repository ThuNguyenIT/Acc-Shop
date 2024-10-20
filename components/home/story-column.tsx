import { Story } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface IStoryColumn {
  stories: Story[];
}
export const StoryColumn: React.FC<IStoryColumn> = ({ stories }) => {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Tiên hiệp</h3>
        <Link
          href="/tien-hiep"
          className="flex items-center text-red-500 hover:underline"
          aria-label="Xem thêm truyện Tiên hiệp"
        >
          Xem thêm
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="mb-4">
        <div className="p-4">
          <div className="flex space-x-4">
            <Image
              src={stories[0].cover_image || ''}
              alt={stories[0].title}
              width={80}
              height={120}
              className="object-cover"
            />
            <div>
              <h4 className="line-clamp-2 font-normal text-black">
                {stories[0].title}
              </h4>
              <p className="leading-18px line-clamp-2 text-sm text-gray-500">
                {stories[0].description}
              </p>
              <p className="text-13px font-normal text-gray-600">
                Chương {stories[0].chapter}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {stories.slice(1).map((story) => (
          <li
            key={story.id}
            className="bottom-dashed"
          >
            <div className="flex items-center justify-between">
              <span className="line-clamp-2 truncate text-sm font-normal text-black">
                {story.title}
              </span>
              <span className="text-sm font-normal text-gray-600">
                Chương {story.chapter}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
