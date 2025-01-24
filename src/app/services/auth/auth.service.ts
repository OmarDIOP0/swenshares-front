import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

// Définir une interface pour la réponse attendue de l'API
interface AuthResponse {
  role: string; // Propriété 'role' attendue dans la réponse
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:8000/api';

  private userRoleSubject = new BehaviorSubject<string>('guest');
  userRole$ = this.userRoleSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  getUserRole(): string {
    return localStorage.getItem('userRole') || 'guest';
  }

  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
    this.userRoleSubject.next(role);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          const role = response.role; // TypeScript reconnaît désormais 'role' grâce à l'interface AuthResponse
          this.setUserRole(role);
        })
      );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  verifyOtp(otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { otp });
  }
}
