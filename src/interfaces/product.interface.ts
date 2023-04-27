export interface I_DataProduct {
  id: number;
  name: string;
  type: number;
  price: number;
  created_at: string;
  updated_at: string;
  quantity?: number;
  description?: string;
}

export interface I_Product {
  name: string;
  type: "pizza" | "dessert" | "pastel" | "acai" | "drink";
  price: number;
  quantity?: number;
  description?: string;
}

export interface I_UpdateProduct {
  name?: string;
  type?: "pizza" | "dessert" | "pastel" | "acai" | "drink";
  price?: number;
  quantity?: number;
  description?: string;
}
