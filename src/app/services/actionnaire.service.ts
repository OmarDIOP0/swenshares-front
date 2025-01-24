import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from './auth/keycloak/keycloak.service';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionnaireService {
  // private apiUrl = 'http://13.93.236.185:8000/api/';
  private apiUrl = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {}

  private async getAuthHeaders(): Promise<HttpHeaders> {
    const token = await this.keycloakService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

    // Méthode pour envoyer les données de l'actionnaire physique
  async ajouterActionnairePhysique(data: any): Promise<Observable<any>> {
    const headers = await this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}shareholders/physical/`, data, { headers });
  }

  // Méthode pour envoyer les données de l'actionnaire morale
  async ajouterActionnaireMorale(data: any): Promise<Observable<any>> {
    const headers = await this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}shareholders/legal/`, data, { headers });
  }

// Méthode pour obtenir tous les actionnaires physiques
getAllActionnairesPhysiques(): Observable<any> {
  return this.http.get(`${this.apiUrl}shareholders/physical/`).pipe(
    catchError((error) => {
      console.error('Error fetching actionnaires physiques:', error);
      return throwError(() => error);
    })
  );
}

  // Mehode pour obtenir tous les actionnaires morales
  getAllActionnairesMorales(): Observable<any> {
    return this.http.get(`${this.apiUrl}shareholders/legal/`).pipe(
      catchError((error) => {
        console.error('Error fetching actionnaires morales:', error);
        return throwError(() => error);
      })
    );
  }

  // Méthode pour récupérer un actionnaire par ID
  getActionnaireById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actionnaires/${id}`);
  }

  // Méthode pour mettre à jour un actionnaire physique
  updateActionnairePhysique(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/actionnaires/physique/${id}`, data);
  }

  // Méthode pour mettre à jour un actionnaire morale
  updateActionnaireMorale(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/actionnaires/morale/${id}`, data);
  }
}
