export interface IPermission {
  id: number;
  name: string;
  icon?: string | null;
  guard_name?: string | null;
  parent_id?: number | null;
  path?: string | null;
  level?: number | null;
  route_name?: string | null;
  title_name?: string | null;
  title_description?: string | null;
  status?: number | null;
  created_at?: Date;
  updated_at?: Date;
  role_permissions?: IRoleHasPermission[];
}
