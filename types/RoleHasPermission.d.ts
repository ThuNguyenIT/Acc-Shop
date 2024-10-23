export interface IRoleHasPermission {
  role_id: number;
  permission_id: number;
  role: IRole;
  permission: IPermission;
}
