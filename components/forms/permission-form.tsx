"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { IPostAddPermissionResponse } from "@/types";
import FormFieldWrapper from "./form-field-wrapper";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(3, { message: "Tên" }),
  path: z.string().optional(),
  route_name: z.string().optional(),
  title_name: z.string().optional(),
  title_description: z.string().optional(),
  status: z.boolean().optional(),
});

type PermissionFormValues = z.infer<typeof formSchema>;

interface PermissionFormProps {
  initialData: any | null;
}

export const PermissionForm: React.FC<PermissionFormProps> = ({ initialData }) => {
  const axiosInstance = createAxiosInstance();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Cập nhật phân quyền" : "Thêm mới phân quyền";
  const action = initialData ? "Cập nhật" : "Thêm mới";
  const defaultValues = initialData
    ? initialData
    : {
      name: "",
      path: "",
      route_name: "",
      title_name: "",
      title_description: "",
      status: true,
    };

  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (_data: PermissionFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        const response = await axiosInstance.put<IPostAddPermissionResponse>(
          `/admin/permission/${initialData.id}`,
          _data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = response;

        if (data?.message) {
          setTimeout(() => {
            router.refresh();
            router.push(`/admin/permission`);
          }, 300);
        }
      } else {
        const response = await axiosInstance.post<IPostAddPermissionResponse>(
          "/admin/permission",
          { ..._data, status: _data?.status ? 1 : 0 },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = response;

        if (data?.message) {
          router.refresh();
          router.replace(`/admin/permisson`);
        }
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={title} description={""} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <div className='gap-8 md:grid md:grid-cols-2'>
            <FormFieldWrapper
              control={form.control}
              name='name'
              label='Tên'
              placeholder='Nhập '
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='path'
              label='Đường dẫn'
              placeholder='Nhập đường dẫn'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='route_name'
              label='Tên route'
              placeholder='Nhập tên route'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='title_name'
              label='Tiêu đề'
              placeholder='Nhập tiêu đề'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='title_description'
              label='Mô tả'
              placeholder='Nhập mô tả'
              disabled={loading}
            />
            <div className='flex items-center space-x-2'>

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className="flex items-center gap-x-0.5">
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <Switch style={{ margin: "0px" }} checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
