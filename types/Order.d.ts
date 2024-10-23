export interface IOrder {
    id: number;
    order_code: string;
    seller: IUser;
    seller_id: number;
    buyer: IUser;
    buyer_id: number;
    platform: IPlatform;
    platformId: number;
    price: number;
    description?: string | null;
    account_type?: string | null;
    duration?: number | null;
    duration_type?: number | null;
    expiration_date?: Date | null;
    payment_status?: string | null;
    payment_date?: Date | null;
    payment_due_date?: Date | null;
    notes?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
  