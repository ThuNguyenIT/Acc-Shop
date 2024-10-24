"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IPermission } from "@/types";
import { Switch } from "@/components/ui/switch";

export const columns: ColumnDef<IPermission>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Tên ",
  },
  {
    accessorKey: "path",
    header: "Đường dẫn",
  },
  {
    accessorKey: "route_name",
    header: "Route",
  },
  {
    accessorKey: "title_name",
    header: "Tiêu đề",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="text-center">Trạng thái</div>
    ),
    cell: ({ row }) => {
      const isActive = row.original.status === 1 ? true : false;

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
