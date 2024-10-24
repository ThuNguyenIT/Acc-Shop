'use client';
import { useState, useEffect } from 'react';
import { User } from '@/constants/data';
import { useRouter } from 'next/navigation';
import { createAxiosInstance } from '@/utils/axiosInstance';
import { useForm } from "react-hook-form"
import { IPermission, IRole } from '@/types';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@radix-ui/react-checkbox';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface IRoleTableProps {
  roles: IRole[]
  permissions: IPermission[]
}

export const RoleTable: React.FC<IRoleTableProps> = (props) => {
  const { roles, permissions } = props
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({})
  const router = useRouter();
  const [Users, setUsers] = useState<User[]>([])
  const axiosInstance = createAxiosInstance()

  const form = useForm({
    defaultValues: {
      username: "",
    },
  })

  useEffect(() => {
    const initialRolePermissions = roles.reduce((acc, role) => ({
      ...acc,
      [role.id]: (role.role_permissions || []).map(permission => permission.permission_id)
    }), {})
    console.log('initialRolePermissions', initialRolePermissions)
    setRolePermissions(initialRolePermissions)
  }, [])

  const handlePermissionChange = (roleId: string, permissionId: string) => {
    setRolePermissions(prevState => {
      const updatedPermissions = prevState[roleId].includes(permissionId)
        ? prevState[roleId].filter(id => id !== permissionId)
        : [...prevState[roleId], permissionId]

      return { ...prevState, [roleId]: updatedPermissions }
    })
  }

  return (
    <>
      <Card className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Role Permissions</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-6">
          {roles.map((role: IRole) => (
            <div key={role.id} className="space-y-2">
              <h3 className="text-lg font-semibold">{role.name}</h3>
              <div className="flex flex-wrap gap-4">
                {permissions.map((permission: IPermission) => (
                  <div key={`${role.id}-${permission.id}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${role.id}-${permission.id}`}
                      checked={rolePermissions[role.id]?.includes(permission.id.toString())}
                      onCheckedChange={() => handlePermissionChange(role.id.toString(), permission.id.toString())}
                    />
                    <label
                      htmlFor={`${role.id}-${permission.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
    </>
  );
};
