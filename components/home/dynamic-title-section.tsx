'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Genders, useHomeStore } from '@/lib';

interface IDynamicTitleSection {
  title: string;
  href: string;
  linkText?: string;
}
export const DynamicTitleSection: React.FC<IDynamicTitleSection> = ({
  title,
  href,
  linkText
}) => {
  const { targetGender } = useHomeStore();
  const [color, setColor] = useState('');

  useEffect(() => {
    // Cập nhật className sau khi component đã mount trên client
    setColor(
      `${targetGender === Genders.MALE ? 'male-blue' : 'female-purple'
      }`)
  }, [targetGender]);
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className={`text-size-20 font-normal text-${color}`}>{title}</h2>
      {linkText && (
        <Link
          href={href}
          className="align-center flex justify-center gap-2 text-base font-normal text-red-400 no-underline hover:underline"
        >
          <Image
            src="/svg/icon-circle-plus.svg" // Path to your SVG in the public folder
            alt={linkText}
            width={14}
            height={14}
          />
          <p className="hidden md:block">{linkText}</p>
        </Link>
      )}
    </div>
  );
};
