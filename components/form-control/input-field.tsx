import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    type?: string;
    readOnly?: boolean;
    [key: string]: any; // Để nhận các props khác nếu cần
}
export default function InputField({
    id,
    label,
    value,
    type = 'text',
    readOnly = false,
    ...restProps
}: InputFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} value={value} readOnly={readOnly} {...restProps} />
        </div>
    )
}