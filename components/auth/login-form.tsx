import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth";

// Schema validation for login
const LoginSchema = z.object({
    email: z.string().email({ message: "Email không hợp lệ." }),
    password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự." }),
});

interface ILoginForm {
    handleCloseAuthModal: () => void
}
export const LoginForm: React.FC<ILoginForm> = ({ handleCloseAuthModal }) => {

    const { setUser } = useAuthStore();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof LoginSchema>) {
        console.log('onSubmit', data)
        setUser({
            id: 10, username: 'vuha',
            email: data.email,
            full_name: "Vu ha"
        })
        handleCloseAuthModal()
    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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


                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Đăng nhập
                </Button>
            </form>
        </Form>
    );
};
