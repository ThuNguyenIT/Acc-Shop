import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import React, { Suspense } from "react";
import FormCardSkeleton from "@/components/form-card-skeleton";
import PlatformViewPage from "../_components/platform-view-page";

type PageProps = { params: { id: string } };
export default function Page({ params }: PageProps) {
  const id = params.id;
  const breadcrumbItems = [
    { title: "Trang chủ", link: "/admin" },
    { title: "Nền tảng", link: "/admin/platform" },
    {
      title: id === "new" ? "Thêm mới" : "Cập nhật",
      link: "/admin/platform/create",
    },
  ];
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4  p-8'>
        <Breadcrumbs items={breadcrumbItems} />
        <Suspense fallback={<FormCardSkeleton />}>
          <PlatformViewPage platformId={params.id} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
