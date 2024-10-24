import { notFound } from "next/navigation";

import { createAxiosInstance } from "@/utils/axiosInstance";
import { EmployeeForm } from "@/components/forms/employee-form";

type TProductViewPageProps = {
    productId: string;
};

export default async function EmployeeViewPage({
    productId,
}: TProductViewPageProps) {
    const axiosInstance = createAxiosInstance();
    let product = null;
    if (productId !== "new") {
        const response = await axiosInstance.get(
            `/admin/employees/${productId}`
        );
        product = response.data.data;
        if (!product) {
            notFound();
        }
    }

    return <EmployeeForm initialData={product} key={null} />;
}