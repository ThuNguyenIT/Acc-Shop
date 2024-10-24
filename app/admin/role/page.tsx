import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { RoleTable } from '@/components/tables/role-table/client';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { IPermission, IRole } from '@/types';
import { createAxiosInstance } from '@/utils/axiosInstance';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin' },
  { title: 'Role', link: '/admin/role' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const axiosInstance = createAxiosInstance();

  const response = await axiosInstance.get<{ message: string; data: { roles: IRole[]; permissions: IPermission[] }}>(`/admin/role`);
  const roles: IRole[] = response.data.data?.roles || [];
  const permissions: IPermission[] = response.data.data?.permissions || [];
  // console.log('roles', roles);
  // console.log('permissions', permissions);
  
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Role (${roles?.length})`}
            description="Manage Roles"
          />
        </div>
        <Separator />
        <RoleTable roles={roles} permissions={permissions}/>
      </div>
    </PageContainer>
  );
}
