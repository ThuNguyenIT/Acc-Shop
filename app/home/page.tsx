import * as React from 'react';
import PageContainer from '@/components/layout/page-container';
import { UpdatedStoriesList } from '@/components/home/updated-stories-list';
import { FavoriteStories } from '@/components/home/favorite-stories';
import { PopularStories } from '@/components/home/popular-stories';
import { StoryColumn } from '@/components/home/story-column';
import { Separator } from '@/components/ui/separator';
import { Story } from '@/types';
import { DynamicTitleSection } from '@/components/home/dynamic-title-section';
import StoryPreferenceModal from '@/components/home/story-preference-modal';

const stories: Story[] = [
  {
    id: '1',
    title: 'Ngã Hữu Chư Thiên Vạn',
    slug: 'nga-huu-chu-thien-van',
    author: 'Kỳ Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder1.png'
  },
  {
    id: '2',
    title: 'Tây Dư Tôi Cường Tô Sư',
    slug: 'tay-du-toi-cuong-to-su',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder2.png'
  },
  {
    id: '3',
    title: 'Linh Khí Phục Tô: Úc Vạn',
    slug: 'linh-khi-phuc-to-uc-van',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder3.png'
  },
  {
    id: '4',
    title: 'Linh Khí Phục Tô: Úc Vạn',
    slug: 'linh-khi-phuc-to-uc-van',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder4.png'
  },
  {
    id: '5',
    title: 'Ngã Hữu Chư Thiên Vạn',
    slug: 'nga-huu-chu-thien-van',
    author: 'Kỳ Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder4.png'
  },
  {
    id: '6',
    title: 'Tây Dư Tôi Cường Tô Sư',
    slug: 'tay-du-toi-cuong-to-su',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder2.png'
  },
  {
    id: '7',
    title: 'Linh Khí Phục Tô: Úc Vạn',
    slug: 'linh-khi-phuc-to-uc-van',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder1.png'
  },
  {
    id: '8',
    title: 'Linh Khí Phục Tô: Úc Vạn',
    slug: 'linh-khi-phuc-to-uc-van',
    author: 'Huyền Huyễn',
    chapter: 4095,
    updatedAt: '14/02/2020',
    coverImage: '/images/placeholder3.png'
  }
];

const completedStories: Story[] = [
  {
    id: '1',
    title: 'Tu Chân Gia Tộc Bình',
    author: 'Unknown', // Provide a default value
    chapter: 4095,
    updatedAt: '2024-09-11', // Provide a default value
    coverImage: '/images/placeholder3.png',
    description: 'Sơn không tại cao, có gia thì sao. Suối không tại uyên...'
  },
  {
    id: '2',
    title: 'Phàm Nhân Tu Tiên Chi',
    author: 'Unknown',
    chapter: 1536,
    updatedAt: '2024-09-11',
    coverImage: '/images/placeholder3.png'
  },
  {
    id: '3',
    title: 'Tạo Hóa Chi Vương',
    author: 'Unknown',
    chapter: 1536,
    updatedAt: '2024-09-11',
    coverImage: '/images/placeholder3.png'
  },
  {
    id: '4',
    title: 'Lâm Uyên Hành',
    author: 'Unknown',
    chapter: 1536,
    updatedAt: '2024-09-11',
    coverImage: '/images/placeholder3.png'
  },
  {
    id: '5',
    title: 'Nhất Niệm Vĩnh Hằng',
    author: 'Unknown',
    chapter: 1536,
    updatedAt: '2024-09-11',
    coverImage: '/images/placeholder3.png'
  },
  {
    id: '6',
    title: 'Đế Bá',
    author: 'Unknown',
    chapter: 1536,
    updatedAt: '2024-09-11',
    coverImage: '/images/placeholder3.png'
  },
  {
    id: '7',
    title: 'Thần Đạo Đan Tôn',
    author: 'Unknown',
    chapter: 1536,
    updatedAt: '2024-09-11',
    coverImage: '/images/placeholder3.png'
  }
];

export default function page() {

  return (
    <PageContainer>

      <UpdatedStoriesList stories={stories} />
      <Separator className="border-1 bg-secondary mb-10 mt-6 border-dashed border-indigo-600" />
      <div className="container mx-auto flex flex-col gap-x-10 space-y-8 px-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <FavoriteStories stories={stories} />
        <PopularStories stories={stories} />
      </div>
      <Separator className="border-1 bg-secondary mb-10 mt-6 border-dashed border-indigo-600" />
      <div className="container mx-auto px-4">
        <DynamicTitleSection title={'Truyện đã hoàn thành'} href={'/more'} />
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StoryColumn stories={completedStories} />
          <StoryColumn stories={completedStories} />
          <StoryColumn stories={completedStories} />
          <StoryColumn stories={completedStories} />
        </div>
      </div>

    </PageContainer>
  );
}
