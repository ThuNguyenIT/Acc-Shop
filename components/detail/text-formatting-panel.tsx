import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger
} from '@/components/ui/popover';
import Image from 'next/image';
import PopoverContentPanel from './popover-content-panel';


export default function TextFormattingPanel() {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-full flex-col items-center justify-center hover:bg-transparent"
        >
          <Image src="/svg/icon-settings.svg" alt={''} width={32} height={32} />
        </Button>
      </PopoverTrigger>
      <PopoverContentPanel />
    </Popover>
  );
}
