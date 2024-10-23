export interface IUserActivity {
  id: number;
  user_id: number;
  action: string;
  description?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  session_id?: string | null;
  user: IUser;
  created_at?: Date;
}
