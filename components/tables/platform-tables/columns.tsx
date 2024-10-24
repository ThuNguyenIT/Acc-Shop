"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IPlatform } from "@/types";
import { convertMoney } from "@/utils/convert";

export const columns: ColumnDef<IPlatform>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Tên nền tảng",
  },
  {
    accessorKey: "mail_recovery",
    header: "Email",
  },
  {
    accessorKey: "country",
    header: "Quốc gia",
  },
  {
    accessorKey: "origin_price",
    header: "Giá gốc",
    cell: ({ row }) => {
      return (
        <div className='flex justify-center items-end'>
          {convertMoney(row.original.origin_price as number)}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Giá hiện tại",
    cell: ({ row }) => {
      return (
        <div className='flex justify-center items-end'>
          {convertMoney(row.original.price as number)}
        </div>
      );
    },
  },
  {
    accessorKey: "percent_discount",
    header: "Giảm giá",
    cell: ({ row }) => {
      return (
        <div className='flex justify-center items-center'>
          {row.original.percent_discount}
        </div>
      );
    },
  },
  {
    accessorKey: "final_price",
    header: "Giá bán cuối cùng",
    cell: ({ row }) => {
      return (
        <div className='flex justify-center items-end'>
          {convertMoney(row.original.final_price as number)}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày gia hạn",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
