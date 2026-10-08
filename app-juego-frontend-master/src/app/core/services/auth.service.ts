import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from "./storage.service";
import { LoginCredentials } from '../models/login-credentials.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { map, Observable, tap } from 'rxjs';
import { product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/users/view/all';
  private storage = inject(StorageService);

  public currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  getProdut(): Observable<product[]> {
    return this.http.get(this.baseUrl).pipe(
      map((res: any) => res.results));
  }


  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(resp => this.storage.setToken(resp.access_token))
        //tap(c => c.jwt)
      );


    // return this.http.post(`${this.baseUrl}/login`, credentials).subscribe((response: any) => {
    //   localStorage.setItem('token', response.token);
    //   this.currentUser.set(response.user);
    //   this.isAuthenticated.set(true);
    //   this.router.navigate(['/dashboard']);
  }



  logout() {
    this.storage.removeToken();
    this.currentUser.set(null);
    //
    //  this.isAuthenticated.set(false);
    //  this.router.navigate(['/login']);
  }

  // constructor(private http: HttpClient, private router: Router) {}








  register(data: { username: string; password: string; email: string }) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }
}