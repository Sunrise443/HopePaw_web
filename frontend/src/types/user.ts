export interface UserProfile {
  id: number;
  login: string;
  email: string;
  city?: string;
  money_sent: number;
}

export interface RegisterData {
  login: string;
  password: string;
  email: string;
  city?: string;
}
