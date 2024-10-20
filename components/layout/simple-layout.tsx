// app/home/simpleLayout.tsx
import Navbar from '@/components/layout/navbar';
import React from 'react';
import NavigationBarFooter from './navigation-bar-footer';
import MobileNavigation from './mobile-navigation';
import { cn } from '@/lib/utils';
import { SheetMenu } from './sheet-menu';
// import { MobileSidebar } from './mobile-sidebar';
// import { cn } from '@/lib/utils';

export default function SimpleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#E5E4DB]">
      <main className="w-full flex-1 overflow-auto">
        <nav className="flex items-center justify-between px-8 py-2 absolute">
          <div className={`${cn('block lg:!hidden')} z-50`}>
            <SheetMenu />
          </div>

        </nav>
        <Navbar />
        <div className="p-4">{children}</div>
        <NavigationBarFooter />
        <MobileNavigation />
      </main>
    </div>
  );
}
