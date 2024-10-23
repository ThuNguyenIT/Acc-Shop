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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { PostAddEmPloyeeResponse } from "@/types";
import { AlertModal } from "../modal/alert-modal";

const formSchema = z.object({
  full_name: z.string().min(3, { message: "Họ và tên phải lớn hơn 3 ký tự" }),

  email: z.string().email({ message: "Email không đúng định dạng" }),

  mobile: z
    .string()
    .regex(/^\d+$/, { message: "Số điện thoại chỉ được chứa chữ số" })
    .length(10, { message: "Số điện thoại phải đúng 10 chữ số" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
}

export const EmployeeForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const axiosInstance = createAxiosInstance();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Cập nhật nhân viên" : "Thêm mới nhân viên";
  const toastMessage = initialData
    ? "Cập nhật nhân viên thành công."
    : "Thêm mới nhân viên thành công.";
  const action = initialData ? "Cập nhật" : "Thêm mới";
  console.log("initialData", initialData);
  const defaultValues = initialData
    ? initialData
    : {
        full_name: "",
        email: "",
        mobile: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (_data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/admin/employees/edit-product/${initialData._id}`, data);
      } else {
        const response = await axiosInstance.post<PostAddEmPloyeeResponse>(
          "/api/admin/employees",
          {
            email: _data.email,
            mobile: _data.mobile,
            full_name: _data.full_name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = response;

        if (data?.message === "Success") {
          router.refresh();
          router.push(`/admin/employee`);
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
          <div className='gap-8 md:grid md:grid-cols-3'>
            <FormField
              control={form.control}
              name='full_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Nhập họ và tên'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type={"email"}
                      disabled={loading}
                      placeholder='Nhập email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mobile'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Nhập số điện thoại'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
