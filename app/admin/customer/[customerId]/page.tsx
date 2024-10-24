import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import CustomerViewPage from "../_components/customer-view-page";
import FormCardSkeleton from '@/components/form-card-skeleton';


type PageProps = { params: { customerId: string } };
export default function Page({ params }: PageProps) {
  const id = params.customerId
  const breadcrumbItems = [
    { title: "Trang chủ", link: "/admin" },
    { title: "Khách hàng", link: "/admin/customer" },
    { title: id === "new" ? "Thêm mới" : "Cập nhật", link: "/admin/customer/create" },
  ];
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4  p-8'>
        <Breadcrumbs items={breadcrumbItems} />
        <Suspense fallback={<FormCardSkeleton />}>
          <CustomerViewPage customerId={params.customerId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}