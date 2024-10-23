"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Switch } from "@/components/ui/switch";
import { IUser } from "@/types";

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: "status",
    header: () => (
      <div className="text-center">Trạng thái</div>
    ),
    cell: ({ row }) => {
      const isActive = row.original.status;

      return (
        <div className="flex justify-center items-center">

          <Switch
            checked={isActive}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];