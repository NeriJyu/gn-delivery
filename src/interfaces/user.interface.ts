export interface I_DataUser {
  id: number;
  name: string;
  password: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface I_User {
  name: string;
  password: string;
  email: string;
}

export interface I_AuthUser {
  id: number;
  name: string;
  email: string;
}
