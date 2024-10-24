import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface FormFieldWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  formatCurrency?: boolean;
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  formatCurrency = false,
}) => {
  const formatCurrencyValue = (value: string) => {
    const numberString = value.replace(/[^0-9]/g, '');
    if (!numberString) return '';

    return Number(numberString).toLocaleString('en-US');
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              placeholder={placeholder}
              type={type}
              {...field}
              value={formatCurrency ? formatCurrencyValue(field.value) : field.value}
              onChange={(e) => {
                if (formatCurrency) {
                  const formattedValue = formatCurrencyValue(e.target.value);
                  field.onChange(formattedValue);
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWrapper;
