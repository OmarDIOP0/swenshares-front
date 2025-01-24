import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import { environment } from '../../../environnements/environment';


@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private apiUrl = 'https://localhost:8000/api';

  constructor(private http: HttpClient) {}

  verifyOtp(otp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, { otp });
  }

  resendOtp(phoneNumber: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resend-otp`, { phoneNumber });
  }
}
