import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Schema validation for register
const RegisterSchema = z.object({
    email: z.string().email({ message: "Email không hợp lệ." }),
    password: z
        .string()
        .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự." })
        .regex(/[a-z]/, { message: "Mật khẩu phải có ít nhất một ký tự thường." })
        .regex(/[A-Z]/, { message: "Mật khẩu phải có ít nhất một ký tự hoa." })
        .regex(/\d/, { message: "Mật khẩu phải có ít nhất một chữ số." })
        .regex(/[@$!%*?&#]/, { message: "Mật khẩu phải có ít nhất một ký tự đặc biệt." }),
    confirmPassword: z.string().min(8, { message: "Xác nhận mật khẩu phải có ít nhất 8 ký tự." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
});
interface IRegisterForm {
    handleCloseAuthModal: () => void
}
export const RegisterForm: React.FC<IRegisterForm> = ({ handleCloseAuthModal }) => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(data: z.infer<typeof RegisterSchema>) {
        console.log('onSubmit', data)
        handleCloseAuthModal()
    }

    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Nhập Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Nhập lại mật khẩu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Đăng ký
                </Button>
            </form>
        </Form>
    );
};
