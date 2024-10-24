import { notFound } from "next/navigation";

import { createAxiosInstance } from "@/utils/axiosInstance";
import { PlatformForm } from "@/components/forms/platform-form";

type TPlatformViewPageProps = {
  platformId: string;
};

export default async function PlatformViewPage({
  platformId,
}: TPlatformViewPageProps) {
  const axiosInstance = createAxiosInstance();
  let platform = null;
  if (platformId !== "new") {
    const response = await axiosInstance.get(`/admin/platform/${platformId}`);
    platform = response.data.data;
    if (!platform) {
      notFound();
    }
  }

  return <PlatformForm initialData={platform} key={null} />;
}
