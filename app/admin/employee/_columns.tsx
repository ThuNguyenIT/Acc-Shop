"use client";

import { ColumnHeader } from "@/app/_components/colounmHeader";
import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const _columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "STT",
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title='Họ và tên' />;
    },
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
    accessorKey: "",
    header: "Tác vụ",
  },
];
