import { notFound } from "next/navigation";

import { EmployeeForm } from "@/components/forms/employee-form";
import { createAxiosInstance } from "@/utils/axiosInstance";

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
      `/api/admin/employees/${productId}`
    );
    product = response.data.data;
    if (!product) {
      notFound();
    }
    // pageTitle = `Edit Product`;
  }

  return <EmployeeForm initialData={product} key={null} />;
}
