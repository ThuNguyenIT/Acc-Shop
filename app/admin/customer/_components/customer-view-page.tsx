import { notFound } from "next/navigation";

import { createAxiosInstance } from "@/utils/axiosInstance";
import { CustomerForm } from "@/components/forms/customer-form";

type TProductViewPageProps = {
    customerId: string;
};

export default async function CustomerViewPage({
    customerId,
}: TProductViewPageProps) {
    const axiosInstance = createAxiosInstance();
    let product = null;
    if (customerId !== "new") {
        const response = await axiosInstance.get(
            `/api/admin/employees/${customerId}`
        );
        product = response.data.data;
        if (!product) {
            notFound();
        }
    }

    return <CustomerForm initialData={product} key={null} />;
}