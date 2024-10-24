import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { columns } from "@/components/tables/customer-tables/columns";
import { CustomerTable } from "@/components/tables/customer-tables/customer-table";
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
  { title: "Khách hàng", link: "/admin/customer" },
];

export default async function Page({ searchParams }: demoPageProp) {
  const full_name = searchParams.search || null;

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
    `/admin/customer?${searchStr}` + (full_name ? `&search=${full_name}` : "")
  );
  let data = await response.data;
  let userData = data.data.customer;
  let totalUsers = data.data.totalCustomer;
  let pageCount = data.data.totalPages;
  let currentPage = data.data.currentPage;
  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading title={`Danh sách khách hàng`} description='' />

          <Link
            href={"/admin/customer/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Link>
        </div>
        <Separator />

        <CustomerTable
          searchKey='full_name'
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
