'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { createAxiosInstance } from '@/utils';

interface ProductsClientProps { }

export const UserClient: React.FC<ProductsClientProps> = (props) => {
  const router = useRouter();
  const [Users, setUsers] = useState<User[]>([])
  // const axiosInstance = createAxiosInstance()

  // const fetchData = async () => {


  //   try {
  //     const response = await axiosInstance.post('/api/admin/user');
  //     setUsers(response.data);
  //   } catch (err) {
  //     console.error(new Error('Failed to fetch data'));

  //   }
  // };

  /* useEffect(() => {
    // Gọi API để lấy danh sách tài khoản
    axios.get('/admin/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error))
  }, []) */

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Nhân viên`}
          description=""
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/admin/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={Users} />
    </>
  );
};
