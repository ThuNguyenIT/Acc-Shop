"use client";
import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: "Họ và tên",
  },
  {
    accessorKey: "mobile",
    header: "Số điện thoại",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
