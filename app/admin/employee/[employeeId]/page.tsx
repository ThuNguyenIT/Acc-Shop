import { Breadcrumbs } from "@/components/breadcrumbs";
import { EmployeeForm } from "@/components/forms/employee-form";
import { ProductForm } from "@/components/forms/product-form";
import PageContainer from "@/components/layout/page-container";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import EmployeeViewPage from "../_components/employee-view-page";

const breadcrumbItems = [
  { title: "Trang chủ", link: "/dashboard" },
  { title: "Nhân viên", link: "/admin/employee" },
  { title: "Thêm mới", link: "/admin/employee/create" },
];
type PageProps = { params: { employeeId: string } };
export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4  p-8'>
        <Breadcrumbs items={breadcrumbItems} />
        {/* <Suspense fallback={<FormCardSkeleton />}> */}
        <EmployeeViewPage productId={params.employeeId} />
        {/* </Suspense> */}
      </div>
    </PageContainer>
    // <ScrollArea className="h-full">
    //   <div className="flex-1 space-y-4 p-8">
    //     <Breadcrumbs items={breadcrumbItems} />
    //     <EmployeeForm
    //       initialData={null}
    //       key={null}
    //     />
    //   </div>
    // </ScrollArea>
  );
}
