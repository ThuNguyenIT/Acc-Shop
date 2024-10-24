import { notFound } from "next/navigation";

import { createAxiosInstance } from "@/utils/axiosInstance";
import { CustomerForm } from "@/components/forms/customer-form";

type TCustomerViewPageProps = {
  customerId: string;
};

export default async function CustomerViewPage({
  customerId,
}: TCustomerViewPageProps) {
  const axiosInstance = createAxiosInstance();
  let customer = null;
  if (customerId !== "new") {
    const response = await axiosInstance.get(`/admin/customer/${customerId}`);
    customer = response.data.data;
    if (!customer) {
      notFound();
    }
  }

  return <CustomerForm initialData={customer} key={null} />;
}
