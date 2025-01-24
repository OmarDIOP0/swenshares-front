import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SocieteEmettrice } from '../models/societeEmettrice';
import { ActeSocial } from '../models/acteSociale';
import { KeycloakService } from './auth/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class SocieteEmettriceService {
  private baseUrl = `${environment.endpoint}/issuingCompany/issuing-companies`;
  private actesBaseUrl = `${environment.endpoint}/issuingCompany/social-acts`;

  constructor(private httpClient: HttpClient,private keycloakService: KeycloakService
) {}

  private async getAuthHeaders(): Promise<HttpHeaders> {
    const token = await this.keycloakService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Récupérer toutes les sociétés émettrices
  getAllSocietesEmettrices(): Observable<SocieteEmettrice[]> {
    return this.httpClient.get<SocieteEmettrice[]>(`${this.baseUrl}/`).pipe(
      catchError(this.handleError)
    );
  }
get(id: number): Observable<SocieteEmettrice> {
  return this.httpClient.get<SocieteEmettrice>(`${this.baseUrl}/${id}`);
}

  // Récupérer les infos d'une société émettrice par ID
  getSocieteEmettriceById(id: number): Observable<SocieteEmettrice> {
    return this.httpClient.get<SocieteEmettrice>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Créer une nouvelle société émettrice
  async createSocieteEmettrice(data:any): Promise<Observable<SocieteEmettrice>> {
    const headers = await this.getAuthHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        ...headers,
      })
    };
    return this.httpClient.post<SocieteEmettrice>(`${this.baseUrl}/`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Modifier une société émettrice
  updateSocieteEmettrice(id: number, societe: SocieteEmettrice): Observable<SocieteEmettrice> {
    return this.httpClient.put<SocieteEmettrice>(`${this.baseUrl}/${id}`, societe).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer une société émettrice
  deleteSocieteEmettrice(id: number): Observable<SocieteEmettrice> {
    return this.httpClient.delete<SocieteEmettrice>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Soumettre une société émettrice
  submitSocieteEmettrice(id: number): Observable<SocieteEmettrice> {
    return this.httpClient.post<SocieteEmettrice>(`${this.baseUrl}/${id}/submit`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Examiner une société émettrice
  examineSocieteEmettrice(id: number): Observable<SocieteEmettrice> {
    return this.httpClient.post<SocieteEmettrice>(`${this.baseUrl}/${id}/examine`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Approuver une société émettrice
  approveSocieteEmettrice(id: number): Observable<SocieteEmettrice> {
    return this.httpClient.post<SocieteEmettrice>(`${this.baseUrl}/${id}/approve`, {}).pipe(
      catchError(this.handleError)
    );
  }
  //ACTE SOCIAL


  getActesSocialsBySocieteId(id: number): Observable<ActeSocial[]> {
    return this.httpClient.get<ActeSocial[]>(`${this.actesBaseUrl}/?companyId=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur serveur (Code ${error.status}): ${error.error?.message || error.statusText}`;

      // Log détaillé de l'erreur
      console.error('Détails de l\'erreur:', {
        status: error.status,
        body: error.error,
        headers: error.headers
      });
    }

    // Vous pouvez personnaliser le message d'erreur en fonction du code de statut
    switch (error.status) {
      case 400:
        errorMessage = 'Requête invalide. Vérifiez les données envoyées.';
        break;
      case 401:
        errorMessage = 'Non autorisé. Vérifiez votre authentification.';
        break;
      case 403:
        errorMessage = 'Accès refusé.';
        break;
      case 500:
        errorMessage = 'Erreur interne du serveur.';
        break;
    }

    // Renvoyer une erreur observable
    return throwError(errorMessage);
  }


  // Récupérer les détails d'une société émettrice par ID
  getIssuingCompanyById(id: number): Observable<SocieteEmettrice> {
    return this.httpClient.get<SocieteEmettrice>(`${this.baseUrl}/${id}/`);
  }


getSocialActs(companyId: number, page: number, pageSize: number): Observable<{ data: ActeSocial[], total: number }> {
  return this.httpClient.get<{ data: ActeSocial[], total: number }>(
    `/api/societes/${companyId}/social-acts`,
    { params: { page, pageSize } }
  );
}
}
