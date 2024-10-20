import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
// import { users } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin' },
  { title: 'User', link: '/admin/user' }
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        {/* <UserClient data={users} /> */}
      </div>
    </PageContainer>
  );
}
