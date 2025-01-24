import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BaseChartDirective } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-societe-emettrice-approbateur',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,MaterialModule,MatFormFieldModule,MatInputModule,MatPaginator,BaseChartDirective,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './societe-emettrice-approbateur.component.html',
  styleUrl: './societe-emettrice-approbateur.component.css'
})
export class SocieteEmettriceApprobateurComponent implements OnInit{

  societes=[
    {
      id:1,
      nom: 'SwenShares',
      description: 'SwenShares est la société émettrice.',
      forme: 'SARL',
      logo: '/images/logo.jpg',
      monnaie: 'XOF',
      documentStatus: 'assets/document-status.pdf',
      documentReglementInterieur: 'assets/document-reglement.pdf',
      rccm: 'RCCM0012345',
      ninea: 'NINEA0123456789',
      organigramme: 'assets/organigramme.pdf',
      status: 'Submitted',
      actionnaires: ['Actionnaire 1', 'Actionnaire 2'],
      timestamp:'2024-12-10',
      comments:"",
      adresse: {
        rue: '123 Rue de la société',
        ville: 'Dakar',
        boitePostale: 'BP 1234',
        pays: 'Sénégal',
        dateEffet: '2024-10-01'
      },
      sociale: {
        capitalSocial: 1000000,
        nombrePartSocial: 100,
        valeurPartSocial: 10000
      },
      acteSocial:[
        {
          dateAG: '2024-10-12',
          pvAG: 'assets/pv-ag.pdf',
          ancienCapital: 800000,
          montant: 200000,
          nouveauCapital: 1000000,
          type: 'augmentation'
        },
        {
          dateAG: '2023-08-15',
          pvAG: 'assets/pv-ag-2023.pdf',
          ancienCapital: 500000,
          montant: 300000,
          nouveauCapital: 800000,
          type: 'augmentation'
        },
      ]
      }
  ]
  notifications: string[] = [];
  selectedSociete:any;
  filterSociete: any;
  p1:number=1;
  pageSize:number=5;
  pageEvent?:PageEvent;
  ngOnInit(): void {
    this.fetchNotifications();
    this.filterSociete = this.societes;
  }

  // constructor(private snackbar:SnackBar){}

  applyFilter(event:Event){
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      const filterValue = inputElement.value.trim().toLowerCase();
      this.filterSociete = this.societes.filter(societe =>
        societe.nom.toLowerCase().includes(filterValue) ||
        societe.timestamp.toLowerCase().includes(filterValue) ||
        societe.status.toLowerCase().includes(filterValue)
      );
    }
  }
  // openSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     duration: 3000,
  //   });
  // }

  fetchNotifications() {
    this.notifications.push('Vous avez '+ this.getPendingCount()+' nouvelles societes emettrices en attente.');
  }
  approveTransaction(societe: any) {
    societe.status= 'Approved';
    this.notifications.push(`Societe "${societe.nom}" approuvée !`);
    // this.openSnackBar(`Transaction approvée avec succès !`, 'Fermer');
    this.fetchNotifications();
  }
  rejectTransaction(societe: any) {
    societe.status = 'Rejected';
    this.notifications.push(`Societe "${societe.nom}" rejetée avec commentaire : "${societe.comments || ''}"`);
    // this.openSnackBar(`Transaction rejetée avec succès !`, 'Fermer');
    this.fetchNotifications();
  }

  openApprovedModal(societe: any) {
    this.selectedSociete = societe;
  }
  openRejectModal(societe: any) {
    this.selectedSociete = societe;
  }

  getPendingCount(): number {
    return this.societes.filter(t => t.status === 'Submitted').length;
  }

}
