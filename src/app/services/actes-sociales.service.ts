import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActeSocial } from '../models/acteSociale';
import { SocieteEmettrice } from '../models/societeEmettrice';
import { KeycloakService } from './auth/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class SocialActService {
  private apiBaseUrl = 'http://localhost:8000/api/issuingCompany';

  constructor(private http: HttpClient,private keycloakService:KeycloakService) {}

    private async getAuthHeaders(): Promise<HttpHeaders> {
      const token = await this.keycloakService.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }

  async getSocialActById(id: number): Promise<Observable<ActeSocial[]>> {
    return this.http.get<ActeSocial[]>(`${this.apiBaseUrl}/social-acts/${id}/`);
  }

  // Récupérer les actes sociaux d'une société spécifique
  getSocialActsByCompany(societeId: number): Observable<ActeSocial[]> {
    return this.http.get<ActeSocial[]>(`${this.apiBaseUrl}/social-acts/`, {
      params: {
        issuing_company: societeId.toString()
      }
    });
  }

  // Créer un nouvel acte social
  async createSocialAct(data:any): Promise<Observable<ActeSocial>> {
    const headers = await this.getAuthHeaders();
    const httpOptions = {
      headers: new HttpHeaders({...headers}),
    };
    return this.http.post<ActeSocial>(`${this.apiBaseUrl}/social-acts/`, data,httpOptions);
  }

  // Mettre à jour un acte social existant
  updateSocialAct(id: number, socialActData: Partial<ActeSocial>): Observable<ActeSocial> {
    return this.http.patch<ActeSocial>(`${this.apiBaseUrl}/social-acts/${id}/`, socialActData);
  }

  // Supprimer un acte social
  deleteSocialAct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/social-acts/${id}/`);
  }
}
