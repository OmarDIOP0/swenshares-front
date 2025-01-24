import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from '../../environnements/environment';
import { ActionnaireMorale } from '../models/actionnaireMorale';
import { ActionnairePhysique } from '../models/actionnairePhysique';
import { SocieteEmettrice } from '../models/societeEmettrice';
import { Transaction } from '../models/transaction';
// import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer tous les actionnaires
  getAllActionnaires(): Observable<(ActionnairePhysique | ActionnaireMorale)[]> {
    return this.http.get<(ActionnairePhysique | ActionnaireMorale)[]>(`${this.apiUrl}/actionnaires`);
  }

  // Méthode pour récupérer toutes les sociétés émettrices
  getAllSocietesEmettrices(): Observable<SocieteEmettrice[]> {
    return this.http.get<SocieteEmettrice[]>(`${this.apiUrl}/societes-emettrices`);
  }

  // Méthode pour récupérer toutes les transactions
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  // Méthode pour approuver une entité
  approveEntity(entity: ActionnairePhysique | ActionnaireMorale | SocieteEmettrice | Transaction): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve`, entity);
  }

  // Méthode pour rejeter une entité
  rejectEntity(entity: ActionnairePhysique | ActionnaireMorale | SocieteEmettrice | Transaction): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject`, entity);
  }
}
