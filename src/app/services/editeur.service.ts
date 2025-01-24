import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment.prod';
// import { environment } from '../../environnements/environment';

@Injectable({
  providedIn: 'root',
})
export class EditeurService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Actionnaires
  getAllActionnaires(): Observable<any> {
    return this.http.get(`${this.apiUrl}/actionnaires`);
  }

  createActionnaire(actionnaire: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/actionnaires`, actionnaire);
  }

  updateActionnaire(id: number, actionnaire: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/actionnaires/${id}`, actionnaire);
  }

  // Transactions
  getAllTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions`);
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, transaction);
  }

  updateTransaction(id: number, transaction: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/transactions/${id}`, transaction);
  }

  // Sociétés émettrices
  getAllSocietesEmettrices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/societes`);
  }

  createSocieteEmettrice(societe: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/societes`, societe);
  }

  updateSocieteEmettrice(id: number, societe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/societes/${id}`, societe);
  }

  // Notifications
  getAllNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`);
  }

  createNotification(notification: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications`, notification);
  }

  updateNotification(id: number, notification: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${id}`, notification);
  }

  // Dividendes et annonces
  getAllDividendes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dividendes`);
  }

  getAllAnnonces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/annonces`);
  }

  createAnnonce(annonce: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/annonces`, annonce);
  }

  updateAnnonce(id: number, annonce: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/annonces/${id}`, annonce);
  }

  // Evenements
  getEvenements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/evenements`); // Remplacez par l'URL correcte si nécessaire
  }

  // Approbation et rejet d'entités
  approveEntity(entity: any): Observable<void> {
    const url = `${this.apiUrl}/${this.getEntityEndpoint(entity)}/approve/${this.getEntityId(entity)}`;
    return this.http.post<void>(url, {});
  }

  rejectEntity(entity: any): Observable<void> {
    const url = `${this.apiUrl}/${this.getEntityEndpoint(entity)}/reject/${this.getEntityId(entity)}`;
    return this.http.post<void>(url, {});
  }

  private getEntityEndpoint(entity: any): string {
    switch (entity.type) {
      case 'ActionnairePhysique':
        return 'actionnaires-physiques';
      case 'ActionnaireMorale':
        return 'actionnaires-morales';
      case 'SocieteEmettrice':
        return 'societes';
      case 'Transaction':
        return 'transactions';
      default:
        throw new Error('Type d\'entité non reconnu');
    }
  }

  private getEntityId(entity: any): number {
    return entity.id;
  }
}
