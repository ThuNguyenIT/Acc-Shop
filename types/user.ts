export interface User {
  id: number;
  parent_id: number;
  type_user: number;
  email: string;
  mobile: string;
  password: string;
  is_verified: boolean;
  status: boolean;
  full_name: string;
  social_network: string;
  created_at: string;
  updated_at: string;
}
export interface PostAddEmPloyeeResponse {
  message: string;
  data: User;
}
