import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { PermissionTable } from "@/components/tables/permission-tables/permission-table";
import { columns } from "@/components/tables/permission-tables/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GetPermissionResponse } from "@/types";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { Plus } from "lucide-react";
import Link from "next/link";

interface demoPageProp {
  searchParams: { [key: string]: string };
}

const breadcrumbItems = [
  { title: "Trang chủ", link: "/admin/dashboard" },
  { title: "Phân quyền", link: "/admin/permission" },
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

  const response = await axiosInstance.get<GetPermissionResponse>(
    `/admin/permission?${searchStr}` + (name ? `&search=${name}` : "")
  );
  let data = await response.data;
  const { permissions, total, totalPages, currentPage } = data.data
  let userData = permissions;
  let totalUsers = total;
  let pageCount = totalPages;
  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading title={`Danh sách phân quyền`} description='' />

          <Link
            href={"/admin/permission/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Link>
        </div>
        <Separator />

        <PermissionTable
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
