import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger
} from '@/components/ui/popover';
import Image from 'next/image';
import PopoverContentPanel from './popover-content-panel';



export default function ReadingCustomization() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 text-gray-600 hover:bg-transparent hover:text-gray-800 "
        >
          <span className="mr-1 border border-dashed border-gray-400">
            <Image
              src="/svg/icon-settings.svg"
              alt={''}
              width={32}
              height={32}
            />
          </span>
          <span>Màu sắc & font chữ</span>
        </Button>
      </PopoverTrigger>
      <PopoverContentPanel/>
    </Popover>
  );
}
