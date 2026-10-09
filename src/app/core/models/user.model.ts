export interface User {
  id: number;  // UUID 
  username: string;
  email: string;
  role: 'PLAYER' | 'ADMIN';
  createdAt: Date;
}