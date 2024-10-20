import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CommentForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="mx-auto w-full text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-xl text-blue-500">Bình Luận (200)</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="text"
              placeholder="Nhập họ tên"
              className="bg-white text-black"
            />
            <Input
              type="email"
              placeholder="Nhập email"
              className="bg-white text-black"
            />
          </div>
          <Textarea
            placeholder="Nội dung"
            className="min-h-[100px] bg-white text-black"
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              Gửi
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
