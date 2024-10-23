export interface IShopAccount {
  id: number;
  platform: IPlatform;
  platformId: number;
  username: string;
  password: string;
  email: string;
  price: number;
  isSold: boolean;
  farm?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
