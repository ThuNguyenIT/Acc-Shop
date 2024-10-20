import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ReadingCustomization from '../detail/reading-customization';

export default function NavigationBarFooter() {
  return (
    <nav
      className=" flex hidden items-center justify-between bg-light-blue px-4 py-2.5
    lg:block"
    >
      <div className="mx-auto flex w-full max-w-1366 justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:bg-transparent hover:text-gray-800"
          >
            <span className="mr-1 border border-dashed border-gray-400">
              <Image
                src="/svg/icon-home.svg" // Path to your SVG in the public folder
                alt={''}
                width={32}
                height={32}
              />
            </span>
            <span className="text-sm">Trang chủ</span>
          </Button>
          <ReadingCustomization />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <span className="mr-1 border border-dashed border-gray-400">
              <Image
                src="/svg/icon-chevron-left-circle.svg" // Path to your SVG in the public folder
                alt={''}
                width={32}
                height={32}
              />
            </span>
          </Button>
          <Select>
            <SelectTrigger className="w-[250px] rounded-[50px] border-gray-600">
              <SelectValue placeholder="Chương 112" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="111">Chương 111</SelectItem>
              <SelectItem value="112">Chương 112</SelectItem>
              <SelectItem value="113">Chương 113</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <span className="mr-1 border border-dashed border-gray-400">
              <Image
                src="/svg/icon-chevron-right-circle.svg" // Path to your SVG in the public folder
                alt={''}
                width={32}
                height={32}
              />
            </span>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:bg-transparent hover:text-gray-800"
          >
            <span className="mr-1 border border-dashed border-gray-400">
              <Image
                src="/svg/icon-alert-triangle.svg" // Path to your SVG in the public folder
                alt={''}
                width={32}
                height={32}
              />
            </span>
            <span className="text-sm">Báo lỗi truyện</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:bg-transparent hover:text-gray-800"
          >
            <span className="mr-1 border border-dashed border-gray-400">
              <Image
                src="/svg/icon-heart.svg" // Path to your SVG in the public folder
                alt={''}
                width={32}
                height={32}
              />
            </span>
            <span className="text-sm">Theo dõi</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
