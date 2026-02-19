export interface UserProfile {
  id: number;
  login: string;
  email: string;
  city?: string;
  money_sent: number;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}

export interface RegisterData {
  login: string;
  password: string;
  email: string;
  city?: string;
}
