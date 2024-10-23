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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { requiredIcon } from "../ui/requiredIcon";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z
    .string({ message: "Vui lòng nhập địa chỉ email" })
    .email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
  password: z
    .string({ message: "Vui lòng nhập mật khẩu" })
    .min(6, "Mật khẩu phải nhiều hơn 6 ký tự")
    .max(32, "Mật khẩu phải ít hơn 32 ký tự"),
});

type UserFormValue = z.infer<typeof formSchema>;

const defaultValues = {
  email: "",
  password: "",
};

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const { toast } = useToast();

  const [loading, startTransition] = useTransition();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const response = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
          callbackUrl,
        });

        if (response?.error) {
          toast({
            variant: "destructive",
            title: "Đăng nhập thất bại.",
            description: response.code,
          });
        } else {
          toast({
            variant: "success",
            title: "Đăng nhập thành công.",
          });

          router.push(response?.url ?? callbackUrl);
        }
      } catch (error) {
        console.error("Sign in error:", error);
        toast({
          variant: "destructive",
          title: "Ờ ồ! Đã xảy ra lỗi.",
          description: "Đăng nhập không thành công",
        });
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          method='post'
          onSubmit={handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email {requiredIcon(true)}</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Nhập email...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu {requiredIcon(true)}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Nhập mật khẩu...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className='ml-auto w-full' type='submit'>
            Đăng nhập
          </Button>
        </form>
      </Form>
    </>
  );
}
