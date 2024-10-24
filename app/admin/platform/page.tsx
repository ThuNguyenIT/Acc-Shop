import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/platform-tables/columns";
import { PlatformTable } from "@/components/tables/platform-tables/platform-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GetPlatformsResponse } from "@/types";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { Plus } from "lucide-react";
import Link from "next/link";

interface demoPageProp {
  searchParams: { [key: string]: string };
}

const breadcrumbItems = [
  { title: "Trang chủ", link: "/admin/dashboard" },
  { title: "Nền tảng", link: "/admin/platform" },
];

export default async function Page({ searchParams }: demoPageProp) {
  const name = searchParams.search || null;

  const axiosInstance = createAxiosInstance();
  if (Object.keys(searchParams).length === 0) {
    searchParams["skip"] = "0";
    searchParams["limit"] = "10";
  }
  let searchStr = Object.keys(searchParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`
    )
    .join("&");

  const response = await axiosInstance.get<GetPlatformsResponse>(
    `/admin/platform?${searchStr}` + (name ? `&search=${name}` : "")
  );
  let data = await response.data;
  let userData = data;
  let totalUsers = 0;
  let pageCount = 1;
  let currentPage = 1;
  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading title={`Danh sách nền tảng`} description='' />

          <Link
            href={"/admin/platform/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Link>
        </div>
        <Separator />

        <PlatformTable
          searchKey='name'
          pageNo={currentPage}
          columns={columns}
          totalUsers={totalUsers}
          data={userData}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
