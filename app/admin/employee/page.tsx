"use client"
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { User } from "@/types";

const breadcrumbItems = [
  { title: "Trang chủ", link: "/admin/dashboard" },
  { title: "Nhân viên", link: "/admin/employee" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
interface IState {
  currentPage: number
  totalPages: number
  loading: boolean
  employees: User[]
}

export default function Page({ searchParams }: paramsProps) {
  const axiosInstance = createAxiosInstance();

  const [state, setState] = useState<IState>({
    currentPage: 1,
    totalPages: 0,
    loading: true,
    employees: []
  });
  const getEmployee = useCallback(async (page = 1) => {
    setState((prev) => ({ ...prev, loading: true }));
    const response = await axiosInstance.get(
      `/api/admin/employees`, {
      params: {
        page,
      },
    }
    );
    const { data } = response;
    if (data?.message === "Success") {
      setState((prev) => ({
        ...prev,
        currentPage: data.data.currentPage,
        totalPages: data.data.totalPages,
        loading: false,
        employees: data.data.employees
      }));
    }

  }, []);
  useEffect(() => {
    getEmployee(state.currentPage);
  }, [getEmployee, state.currentPage]);

  const handleSetStateField = useCallback(
    (field: keyof IState, value: string | null | User | number) => {
      setState((prevState) => ({ ...prevState, [field]: value }));
    },
    []
  );
  const handlePreviousPage = useCallback(() => {
    if (state.currentPage > 1) {
      handleSetStateField('currentPage', state.currentPage - 1)
    }
  }, [])

  const handleNextPage = () => {
    if (state.employees && state.currentPage < state.totalPages) {
      handleSetStateField('currentPage', state.currentPage + 1)
    }
  }
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày cập nhật</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.full_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell>{new Date(employee.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between">
          <div>
            Hiển thị {state.employees.length} của {state.totalPages} khách hàng
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={state.currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Trước
            </Button>
            <div>
              Trang {state.currentPage} của {state.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={state.currentPage === state.totalPages}
            >
              Sau
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
