'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUpload from '../file-upload';
import { useToast } from '../ui/use-toast';
const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  full_name: z
    .string()
    .min(3, { message: 'Họ và tên phải lớn hơn 3 ký tự' }),

  link: z
    .string()
    .url({ message: 'Liên kết không đúng định dạng URL' }),

  mobile: z
    .string()
    .regex(/^\d+$/, { message: 'Số điện thoại chỉ được chứa chữ số' })
    .length(10, { message: 'Số điện thoại phải đúng 10 chữ số' }),
});

type CustomerFormValues = z.infer<typeof formSchema>;

interface CustomerFormProps {
  initialData: any | null;
  categories: any;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  initialData,
  categories
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Cập nhật khách hàng' : 'Thêm mới khách hàng';
  const toastMessage = initialData ? 'Cập nhật khách hàng thành công.' : 'Thêm mới khách hàng thành công.';
  const action = initialData ? 'Cập nhật' : 'Thêm mới';

  const defaultValues = initialData
    ? initialData
    : {
      full_name: '',
      link: '',
      mobile: '',
    };

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        console.log('data', data)
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      // router.refresh();
      // router.push(`/admin/products`);
      // toast({
      //   variant: 'destructive',
      //   title: 'Uh oh! Something went wrong.',
      //   description: 'There was a problem with your request.'
      // });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


  return (
    <>

      <div className="flex items-center justify-between">
        <Heading title={title} description={''} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Fb/Zalo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên fb/zalo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập link fb/zalo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Nhập số điện thoại" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
