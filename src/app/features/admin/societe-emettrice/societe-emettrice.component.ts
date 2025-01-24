import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SocieteEmettrice } from '../../../models/societeEmettrice';
import { SocieteEmettriceService } from '../../../services/societe-emettrice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActeSocial } from '../../../models/acteSociale';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SocialActService } from '../../../services/actes-sociales.service';

@Component({
  selector: 'app-societe-emettrice',
  standalone: true,
  imports: [CommonModule, RouterModule, MatPaginatorModule,MatFormFieldModule,MatInputModule],
  templateUrl: './societe-emettrice.component.html',
  styleUrls: ['./societe-emettrice.component.css'],
})
export class SocieteEmettriceComponent implements OnInit {
  societes: SocieteEmettrice[] = [];
  selectedSociete?: SocieteEmettrice;
  actesSociaux: ActeSocial[] = [];
  p1: number = 1;
  pageSize: number = 5;
  pageEvent?: PageEvent;
  filteredSocieteEmettrice: any[] = [];

  constructor(
    private societeService: SocieteEmettriceService,
    private snackBar: MatSnackBar,
    private socialActeService: SocialActService
  ) {}

  ngOnInit(): void {
   this.fetchSocietes();
  }

  fetchSocietes(): void {
    this.societeService.getAllSocietesEmettrices().subscribe({
      next: (data) => {
        this.societes = data;
        this.filteredSocieteEmettrice = this.societes;
        console.log('Societes récupérées', data);
        this.openSnackBar('Sociétés récupérées avec succès', 'Fermer');
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des sociétés : ', error);
        this.openSnackBar('Erreur lors de la récupération des sociétés', 'Fermer');
      },
    });
  }

  fetchById(id: number): void {
    this.societeService.getSocieteEmettriceById(id).subscribe({
      next: (data) => {
        this.selectedSociete = data;
        this.openSnackBar(`Société "${data?.name}" chargée avec succès`, 'Fermer');
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération de la société : ', error);
        this.openSnackBar('Erreur lors de la récupération de la société', 'Fermer');
      },
    });
  }

  fetchActesSocials(societeId: number): void {
    this.socialActeService.getSocialActsByCompany(societeId).subscribe({
      next: (data) => {
        this.actesSociaux = data;
        console.log('Actes sociaux récupérés', data);
        this.openSnackBar('Actes sociaux récupérés avec succès', 'Fermer');
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des actes sociaux : ', error);
        this.openSnackBar('Erreur lors de la récupération des actes sociaux', 'Fermer');
      },
    });
  }

  selectSociete(societe: SocieteEmettrice): void {
    this.selectedSociete = societe;
    this.fetchActesSocials(societe.id);
    console.log(this.fetchActesSocials(societe.id));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const filterValue = inputElement.value.trim().toLowerCase();
      this.filteredSocieteEmettrice = this.societes.filter(societe =>
        societe.name.toLowerCase().includes(filterValue) ||
        societe.ninea.toLowerCase().includes(filterValue) ||
        societe.status.toLowerCase().includes(filterValue)
      );
    }
  }
}







  // addSociete(newSociete:SocieteEmettrice):void{
  //   this.societeService.createSocieteEmettrice(newSociete).subscribe({
  //     next:(creatSociete)=>{
  //       this.societes.push(creatSociete);
  //       this.openSnackBar(`Société "${creatSociete.nom}" ajoutée avec success`,'Fermer');
  //     },
  //     error:(error: any)=>{
  //       console.error('Erreur lors de l\'ajout de la société : ', error);
  //       this.openSnackBar('Erreur lors de l\'ajout de la société','Fermer');
  //     }
  //   })
  // }
