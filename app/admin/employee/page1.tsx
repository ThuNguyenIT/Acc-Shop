import PageContainer from "@/components/layout/page-container";
import { DataTable } from "./data-table";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { _columns } from "./_columns";

interface demoPageProp {
  searchParams: { [key: string]: string };
}

const breadcrumbItems = [
  { title: "Trang chủ", link: "/admin/dashboard" },
  { title: "Nhân viên", link: "/admin/employee" },
];

export default async function Page({ searchParams }: demoPageProp) {
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

  const response = await axiosInstance.get(`/api/admin/employees?${searchStr}`);
  let data = await response.data;
  let userData = data.data.employees;
  let total = data.data.totalEmployee;

  return (
    <PageContainer scrollable={true}>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />
        <div className='flex items-start justify-between'>
          <Heading title={`Danh sách nhân viên`} description='' />

          <Link
            href={"/admin/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Link>
        </div>
        <Separator />
        <DataTable columns={_columns} data={userData} total={total} />
      </div>
    </PageContainer>
  );
}
