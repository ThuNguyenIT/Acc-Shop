export interface IPlatform {
  id: number;
  name: string;
  source?: string | null;
  password?: string | null;
  mail_recovery?: string | null;
  country?: string | null;
  origin_price?: number | null;
  price: number;
  percent_discount?: number | null;
  final_price?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  accounts?: IShopAccount[];
  orders?: IOrder[];
}

export interface IPostAddPlatformResponse {
  message: string;
  data: IPlatform;
}

export interface GetPlatformsResponse {
  message: string;
  data: {
    platforms: IPlatform[];
    currentPage: number;
    totalPages: number;
    total: number;
  };
}
