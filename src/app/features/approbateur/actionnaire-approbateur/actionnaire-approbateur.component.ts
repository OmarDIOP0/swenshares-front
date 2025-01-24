import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actionnaire-approbateur',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,MatPaginatorModule,MatTooltipModule,MatFormFieldModule,MatInputModule],
  templateUrl: './actionnaire-approbateur.component.html',
  styleUrl: './actionnaire-approbateur.component.css'
})
export class ActionnaireApprobateurComponent implements OnInit {

  physicalShareholders = [
    { id: 1, nom: 'Issa Faye', email: 'issa.faye@example.com', telephone: '+221 77 612 56 78', pays: 'Senegal',status: 'Submitted' },
    { id: 2, nom: 'Kaly Diallo', email: 'kaly.diallo@example.com', telephone: '+33 7 98 76 54 32', pays: 'France',status: 'Submitted' },
    { id: 3, nom: 'Ousmane Ba', email: 'ousmane.ba@example.com', telephone: '+221 77 123 45 67', pays: 'Sénégal' ,status: 'Submitted'},
    { id: 4, nom: 'Issa Faye', email: 'issa.faye@example.com', telephone: '+33 6 12 34 56 78', pays: 'France',status: 'Submitted' },
    { id: 5, nom: 'Kaly Diallo', email: 'kaly.diallo@example.com', telephone: '+33 7 98 76 54 32', pays: 'France',status: 'Submitted' },
    { id: 6, nom: 'Ousmane Ba', email: 'ousmane.ba@example.com', telephone: '+221 77 123 45 67', pays: 'Sénégal',status: 'Submitted' },
  ];
  moralShareholders = [
    { id: 1, nomEntreprise: 'Tech Corp', email: 'contact@techcorp.com', telephone: '+221 33 415 12 47', pays: 'Sénégal',status: 'Submitted' },
    { id: 2, nomEntreprise: 'Entreprise ABC', email: 'info@entrepriseabc.com', telephone: '+221 33 133 45 89', pays: 'Sénégal',status: 'Submitted' },
    { id: 3, nomEntreprise: 'Dakar Consulting', email: 'contact@dakarconsulting.sn', telephone: '+221 33 123 45 67', pays: 'Sénégal',status: 'Submitted' },
  ];
  p1: number = 1;
  p2: number = 1;
  pageSize: number = 5;
  pageEvent?: PageEvent;
  // selectedShareholder: any;
  filteredPhysicalShareholders:any;
  filteredMoralShareholders:any;
  notifications: string[] = [];
  // selectedTransaction: any;
  selectedActionnaire:any;
   ngOnInit(): void {
    this.filteredPhysicalShareholders = this.physicalShareholders;
    this.filteredMoralShareholders = this.moralShareholders;
    this.fetchNotifications();
   }
   constructor(private snackBar:MatSnackBar){}

   applyFilter(event:Event){
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      const filterValue = inputElement.value.trim().toLowerCase();
      this.filteredPhysicalShareholders = this.physicalShareholders.filter(shareholder=>
        shareholder.nom.toLowerCase().includes(filterValue) ||
        shareholder.status.toLowerCase().includes(filterValue) ||
        shareholder.telephone.toLowerCase().includes(filterValue) ||
        shareholder.pays.toLowerCase().includes(filterValue)
      )
      this.filteredMoralShareholders = this.moralShareholders.filter(shareholder=>
        shareholder.nomEntreprise.toLowerCase().includes(filterValue) ||
        shareholder.status.toLowerCase().includes(filterValue)
      )
    }
   }

   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
   approveActionnaire(actionnaire: any) {
    actionnaire.status = 'Approved';
    this.notifications.push(`Actionnaire "${actionnaire.nom}" approuvée !`);
    // this.updateChartData(this.filterTransactions);
    this.openSnackBar(`Actionnaire "${actionnaire.nom}" approvée avec succès !`, 'Fermer');
  }
  rejectActionnaire(actionnaire: any) {
    actionnaire.status = 'Rejected';
    this.notifications.push(`Actionnaire "${actionnaire.nom}" rejetée avec commentaire : "${actionnaire.comments || ''}"`);
    // this.updateChartData(this.filterActionnaires);
    this.openSnackBar(`Actionnaire "${actionnaire.nom}" rejetée avec succès !`, 'Fermer');
  }

  openApprovedModal(actionnaire: any) {
    this.selectedActionnaire = actionnaire;
  }
  openRejectModal(actionnaire: any) {
    this.selectedActionnaire = actionnaire;
  }
  fetchNotifications() {
    this.notifications.push('Vous avez 2 nouvelles transactions en attente.');
  }

}
