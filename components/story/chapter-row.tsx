import { cn } from '@/lib/utils';
import { Chapter } from '@/types';

export const ChapterRow: React.FC<{ chapter: Chapter; isEven: boolean }> = ({
  chapter,
  isEven
}) => (
  <div className={cn('flex justify-between p-3 border-b border-gray-300 my-4')}>
    <a href="#" className="text-black text-sm">
      {chapter.title}
    </a>
    <span className="italic text-gray-600 text-sm">{chapter.updated_at}</span>
  </div>
);
