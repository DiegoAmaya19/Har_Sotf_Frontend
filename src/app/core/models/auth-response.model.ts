import { User } from './user.model';
export interface AuthResponse {
  [x: string]: string | User | Date;
  access_token: string;
  user: User;
  expiresAt: Date;
}


export interface TokenInformacion {
  sub: string;
  "user-id": string;
  roles: string[];
}