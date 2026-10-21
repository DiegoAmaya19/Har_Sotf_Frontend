import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequestDTO {
  username: string;
  password: string;
}

interface LoginResponseDTO {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: 'PLAYER' | 'ADMIN';
  };
}


export class LoginService {
  private readonly baseUrlLogin = `http://localhost:8080/api/auth/login`; // Pendiente para el environment variable
  private readonly baseUrlForgotPassword = `http://localhost:8080/api/auth/forgot-password`; // Pendiente para el environment variable
  private readonly baseUrlChangePassword = `http://localhost:8080/api/auth/change-password`; // Pendiente para el environment variable


  // Método para iniciar sesión
  //login(dto: LoginRequestDTO): Observable<LoginResponseDTO> {
 //   return this.http.post<LoginResponseDTO>(this.baseUrlLogin, dto);
 // }

  // Método para recuperar contraseña
 // forgotPassword(email: string): Observable<void> {
   // return this.http.post<void>(this.baseUrlForgotPassword, { email });
 // }

  // Método para cambiar contraseña
//  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    //return this.http.post<void>(this.baseUrlChangePassword, {
   //   currentPassword,
    //  newPassword,
 //   });
//  }
}