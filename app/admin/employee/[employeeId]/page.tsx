import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import EmployeeViewPage from "../_components/employee-view-page";
import FormCardSkeleton from '@/components/form-card-skeleton';


type PageProps = { params: { employeeId: string } };
export default function Page({ params }: PageProps) {
  const id = params.employeeId
  const breadcrumbItems = [
    { title: "Trang chủ", link: "/dashboard" },
    { title: "Nhân viên", link: "/admin/employee" },
    { title: id === "new" ? "Thêm mới" : "Cập nhật", link: "/admin/employee/create" },
  ];
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4  p-8'>
        <Breadcrumbs items={breadcrumbItems} />
        <Suspense fallback={<FormCardSkeleton />}>
          <EmployeeViewPage productId={params.employeeId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}