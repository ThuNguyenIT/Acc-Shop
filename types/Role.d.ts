export interface IRole {
  id: number;
  name: string;
  guard_name?: string | null;
  description?: string | null;
  created_at?: Date;
  updated_at?: Date;
  model_has_roles?: IModelHasRole[];
  role_permissions?: IRoleHasPermission[];
}
