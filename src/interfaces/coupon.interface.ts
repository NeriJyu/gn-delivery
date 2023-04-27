export interface I_DataCoupon {
  id: number;
  name: string;
  price: number;
  percentage: boolean;
  created_at: string;
  updated_at: string;
  maxPrice?: number;
}

export interface I_Coupon {
  name: string;
  price: number;
  percentage: boolean;
  maxPrice?: number;
}
