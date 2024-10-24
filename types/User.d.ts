export interface IUser {
  id: number;
  parent_id?: number | null;
  type_user: number;
  email: string;
  mobile?: string | null;
  password: string;
  is_verified: boolean;
  status: boolean;
  full_name?: string | null;
  social_network?: Record<string, any> | null;
  created_at?: Date;
  updated_at?: Date;
  parent?: IUser | null;
  children?: IUser[];
  user_activities?: IUserActivity[];
  model_has_roles?: IModelHasRole[];
  seller_orders?: IOrder[];
  buyer_orders?: IOrder[];
}

export interface IPostAddEmPloyeeResponse {
  message: string;
  data: IUser;
}
