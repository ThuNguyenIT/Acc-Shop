import { Breadcrumbs } from '@/components/breadcrumbs';
import { CustomerForm } from '@/components/forms/customer-form';
import { EmployeeForm } from '@/components/forms/employee-form';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Trang chủ', link: '/dashboard' },
  { title: 'Khách hàng', link: '/admin/customer' },
  { title: 'Thêm mới', link: '/admin/customer/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <CustomerForm
          categories={[
            { _id: 'shirts', name: 'shirts' },
            { _id: 'pants', name: 'pants' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
