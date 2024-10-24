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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { IPostAddEmPloyeeResponse, IPostAddPlatformResponse } from "@/types";
import FormFieldWrapper from "./form-field-wrapper";

const formSchema = z.object({
  name: z.string().min(3, { message: "Tên nền tảng phải lớn hơn 3 ký tự" }),
  source: z.string().optional(),
  password: z.string().optional(),
  mail_recovery: z.string().email({ message: "Email không hợp lệ" }).optional(),
  country: z.string().optional(),

  origin_price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message:
        "Giá gốc không hợp lệ",
    })
    .optional(),

  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message:
      "Giá bán không hợp lệ",
  }),

  percent_discount: z
    .preprocess(
      (val) => {
        return typeof val === "string" ? parseFloat(val) : val;
      },
      z.number().refine((value) => value >= 0 && value <= 1, {
        message: "Giảm giá phải là số thập phân trong khoảng từ 0 đến 1",
      })
    )
    .optional(),

  final_price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message:
        "Giá cuối cùng không hợp lệ",
    })
    .optional(),
});

type PlatformFormValues = z.infer<typeof formSchema>;

interface PlatformFormProps {
  initialData: any | null;
}

export const PlatformForm: React.FC<PlatformFormProps> = ({ initialData }) => {
  const axiosInstance = createAxiosInstance();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Cập nhật nền tảng" : "Thêm mới nền tảng";
  const action = initialData ? "Cập nhật" : "Thêm mới";
  const defaultValues = initialData
    ? initialData
    : {
      name: "",
      source: "",
      password: "",
      mail_recovery: "",
      country: "",
      origin_price: "",
      price: "",
      percent_discount: 0,
      final_price: "",
    };

  const form = useForm<PlatformFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (_data: PlatformFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        const response = await axiosInstance.put<IPostAddEmPloyeeResponse>(
          `/admin/platform/${initialData.id}`,
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
            router.push(`/admin/platform`);
          }, 300);
        }
      } else {
        const response = await axiosInstance.post<IPostAddPlatformResponse>(
          "/admin/platform",
          _data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = response;

        if (data?.message) {
          router.refresh();
          router.replace(`/admin/platform`);
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
            <FormFieldWrapper
              control={form.control}
              name='name'
              label='Tên nền tảng'
              placeholder='Nhập tên nền tảng'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='source'
              label='Nguồn gốc'
              placeholder='Nhập nguồn gốc'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='password'
              label='Mật khẩu'
              placeholder='Nhập mật khẩu'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='mail_recovery'
              label='Email khôi phục'
              placeholder='Nhập email khôi phục'
              type='email'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='country'
              label='Quốc gia'
              placeholder='Nhập quốc gia'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='origin_price'
              label='Giá gốc'
              placeholder='Nhập giá gốc'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='price'
              label='Giá bán hiện tại'
              placeholder='Nhập giá bán hiện tại'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='percent_discount'
              label='Giảm giá'
              placeholder='Nhập giảm giá'
              disabled={loading}
            />
            <FormFieldWrapper
              control={form.control}
              name='final_price'
              label='Giá bán cuối cùng'
              placeholder='Nhập giá bán cuối cùng'
              disabled={loading}
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
