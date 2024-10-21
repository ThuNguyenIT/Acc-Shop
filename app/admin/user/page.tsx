import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
// import { users } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Trang chủ', link: '/admin' },
  { title: 'Danh sách nhân viên', link: '/admin/user' }
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient />
      </div>
    </PageContainer>
  );
}
