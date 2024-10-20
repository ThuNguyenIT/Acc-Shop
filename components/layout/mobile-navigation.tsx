import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import TextFormattingPanel from '../detail/text-formatting-panel';

interface NavItem {
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    icon: <Image src="/svg/icon-home.svg" alt={''} width={32} height={32} />,
    href: '/'
  },
  {
    icon: (
      <Image src="/svg/icon-settings.svg" alt={''} width={32} height={32} />
    ),
    href: '#'
  },
  {
    icon: (
      <Image
        src="/svg/icon-chevron-left-circle.svg"
        alt={''}
        width={32}
        height={32}
      />
    ),
    href: '/prev'
  },
  {
    icon: (
      <Image
        src="/svg/icon-chevron-right-circle.svg"
        alt={''}
        width={32}
        height={32}
      />
    ),
    href: '/next'
  },
  {
    icon: (
      <Image
        src="/svg/icon-alert-triangle.svg"
        alt={''}
        width={32}
        height={32}
      />
    ),
    href: '/report'
  },
  {
    icon: <Image src="/svg/icon-heart.svg" alt={''} width={32} height={32} />,
    href: '/heart'
  }
];

export default function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 block border-t bg-background lg:hidden">
      <nav className="flex h-16 items-center justify-around">
        <Link
          href={'/'}
          className="flex h-full flex-col items-center justify-center hover:bg-transparent"
        >
          <Image src="/svg/icon-home.svg" alt={''} width={32} height={32} />
        </Link>
        <TextFormattingPanel />
        {/* <Button
          variant="ghost"
          size="icon"
          className="flex h-full flex-col items-center justify-center hover:bg-transparent"
        >
          <Image src="/svg/icon-settings.svg" alt={''} width={32} height={32} />
        </Button> */}
        <Button
          variant="ghost"
          size="icon"
          className="flex h-full flex-col items-center justify-center hover:bg-transparent"
        >
          <Image
            src="/svg/icon-chevron-left-circle.svg"
            alt={''}
            width={32}
            height={32}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-full flex-col items-center justify-center hover:bg-transparent"
        >
          <Image
            src="/svg/icon-chevron-right-circle.svg"
            alt={''}
            width={32}
            height={32}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-full flex-col items-center justify-center hover:bg-transparent"
        >
          <Image
            src="/svg/icon-alert-triangle.svg"
            alt={''}
            width={32}
            height={32}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-full flex-col items-center justify-center hover:bg-transparent"
        >
          <Image src="/svg/icon-heart.svg" alt={''} width={32} height={32} />
        </Button>
      </nav>
    </div>
  );
}
