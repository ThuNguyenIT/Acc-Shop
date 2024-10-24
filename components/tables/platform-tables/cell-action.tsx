"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPlatform } from "@/types";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface CellActionProps {
  data: IPlatform;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const axiosInstance = createAxiosInstance();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = useCallback(async () => {
    const response = await axiosInstance.delete(`/admin/platform/${data.id}`);
    const _data = response.data;

    if (_data) {
      router.refresh();
      router.replace(`/admin/platform`);
      setOpen(false);
    }
  }, [data.id, router]);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/platform/${data.id}`)}
          >
            <Edit className='mr-2 h-4 w-4' /> Sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' /> Xoá
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
