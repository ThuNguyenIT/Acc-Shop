import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmployeeForm } from '@/components/forms/employee-form';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Trang chủ', link: '/dashboard' },
  { title: 'Nhân viên', link: '/admin/employee' },
  { title: 'Thêm mới', link: '/admin/employee/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeForm
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
