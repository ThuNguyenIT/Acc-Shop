import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { Plus } from "lucide-react";
import Link from "next/link";

interface demoPageProp {
  searchParams: { [key: string]: string };
}

const breadcrumbItems = [
  { title: "Trang chủ", link: "/admin/dashboard" },
  { title: "Nhân viên", link: "/admin/employee" },
];

export default async function Page({ searchParams }: demoPageProp) {
  const country = searchParams.search || null;

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

  const response = await axiosInstance.get(
    `/api/admin/employees?${searchStr}` + (country ? `&search=${country}` : "")
  );
  let data = await response.data;
  let userData = data.data.employees;
  let totalUsers = data.data.totalEmployee;
  let pageCount = data.data.totalPages;
  return (
    <PageContainer>
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

        <EmployeeTable
          searchKey='full_name'
          pageNo={1}
          columns={columns}
          totalUsers={totalUsers}
          data={userData}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}