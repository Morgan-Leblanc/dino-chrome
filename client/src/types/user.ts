export interface User {
  id: string;
  accountName: string;
  username: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}
