import Image from 'next/image';
import * as React from 'react';

export default function Footer() {
  return (
    <footer
      className="bg-full w-full bg-no-repeat py-6"
      style={{
        backgroundImage: `url("/images/bg-footer.png")`
      }}
    >
      <div className="container mx-auto grid grid-cols-12 gap-4 px-4">
        <div className="col-span-12 mb-4 md:col-span-3 md:mb-0 hidden md:block">
          <Image
            className="h-24 w-24 items-center justify-center"
            src="/images/logo.png" // Relative path from the public folder
            alt="Mystical landscape with pagodas on misty mountains"
            width={112}
            height={101}
          />
        </div>
        <div className="col-span-12 flex flex-col items-center md:col-span-9 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="mb-2 text-sm text-black">
              © 2020 Truyện chữ giải
            </p>
            <p className="mb-2 text-sm text-black">
              Thư viện truyện chữ ở và free cho cộng đồng fan kiếm hiệp, tiên
              hiệp, ngôn tình. Chúc các bạn có những giây phút thư giãn thoải mái sau giờ làm
              việc và học tập căng thẳng.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
