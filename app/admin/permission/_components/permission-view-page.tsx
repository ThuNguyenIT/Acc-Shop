import { notFound } from "next/navigation";

import { createAxiosInstance } from "@/utils/axiosInstance";
import { PermissionForm } from "@/components/forms/permission-form";

type TPermissionViewPageProps = {
  permissionId: string;
};

export default async function PermissionViewPage({
  permissionId,
}: TPermissionViewPageProps) {
  const axiosInstance = createAxiosInstance();
  let permission = null;
  if (permissionId !== "new") {
    const response = await axiosInstance.get(`/admin/permission/${permissionId}`);
    permission = response.data.data;
    if (!permission) {
      notFound();
    }
  }

  return <PermissionForm initialData={permission} key={null} />;
}
