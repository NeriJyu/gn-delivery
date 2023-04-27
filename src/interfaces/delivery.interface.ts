export interface I_DataDelivery {
  id: number;
  userId: number;
  status:
    | "refused"
    | "awaitingConfirmation"
    | "confirmed"
    | "preparing"
    | "onRoute"
    | "delivered";
  value: number;
  created_at: string;
  updated_at: string;
}

export interface I_Delivery {
  userId: number;
  status:
    | "refused"
    | "awaitingConfirmation"
    | "confirmed"
    | "preparing"
    | "onRoute"
    | "delivered";
  value: number;
}
