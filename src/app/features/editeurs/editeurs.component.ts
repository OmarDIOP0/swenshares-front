import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from '../../shared/layout/footer/footer.component';
import { EditeurService } from '../../services/editeur.service';
import { ActionnaireMorale } from '../../models/actionnaireMorale';
import { ActionnairePhysique } from '../../models/actionnairePhysique';
import { Transaction } from '../../models/transaction'; // Assurez-vous que ce modèle est défini
import { Evenement } from '../../models/evenement';

@Component({
  selector: 'app-editeurs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FooterComponent
  ],
  templateUrl: './editeurs.component.html',
  styleUrls: ['./editeurs.component.css'],
})
export class EditeursComponent implements OnInit {
  actionnaires: (ActionnairePhysique | ActionnaireMorale)[] = [];
  actionnairePhysiqueCount: number = 28;
  actionnaireMoralCount: number = 14;
  transactions: Transaction[] = [];  // Définir le tableau des transactions
  evenements: Evenement[] = [];      // Définir le tableau des événements

  entreprise = {
    raisonSociale: 'SENEGINDIA',
    forme: 'SA',
    paysSiege: 'Sénégal',
    monnaieBase: 'XOF (CFA)',
    nbreActionnaires: 3145,
    nbrePartsSociales: 689,
    capitalSocial: '25 265 000 000'
  };

  lignesTop10: string[] = [
    'Issa FAYE ',
    'Moussa NDIAYE',
    'Actionnaire 3',
    'Actionnaire 4',
   
  ];

  lignesTransactions: string[] = [
    'Transaction 1',
    'Transaction 2',
    'Transaction 3',
    'Transation 4'
  ];
  lignesEvenements: string[] = [
    'AG Ordinaires du 20/04/2024',
    'AG Extraodinaire du 10/11/2024',
    'Dividente 2024',
    'Augmentation Capital'
  ];
  // import { environment } from '../../environnements/environment';

  constructor(private editeurService: EditeurService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.editeurService.getAllActionnaires().subscribe(
      (data: (ActionnairePhysique | ActionnaireMorale)[]) => {
        this.actionnaires = data;
        this.actionnairePhysiqueCount = data.filter(actionnaire => 'prenom' in actionnaire).length;
        this.actionnaireMoralCount = data.filter(actionnaire => 'nomDirigeant' in actionnaire).length;
      },
      (error) => {
        console.error('Erreur de chargement des actionnaires', error);
      }
    );

    // Chargez les transactions ici (ajoutez un service pour les récupérer)
    this.editeurService.getAllTransactions().subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
        this.lignesTransactions = data.map(transaction => `${transaction.actionnaireId} (${transaction.dateTransaction})`);
      },
      (error) => {
        console.error('Erreur de chargement des transactions', error);
      }
    );

    // Chargez les événements ici (ajoutez un service pour les récupérer)
    this.editeurService.getEvenements().subscribe(
      (data: Evenement[]) => {
        this.evenements = data;
        this.lignesEvenements = data.map(evenement => `${evenement.description} (${evenement.date})`);
      },
      (error) => {
        console.error('Erreur de chargement des événements', error);
      }
    );
  }

  // isActionnairePhysique(actionnaire: ActionnairePhysique | ActionnaireMorale): actionnaire is ActionnairePhysique {
  //   return actionnaire != null && (actionnaire as ActionnairePhysique).prenom !== undefined;
  // }

  isActionnaireMorale(actionnaire: ActionnairePhysique | ActionnaireMorale): actionnaire is ActionnaireMorale {
    return actionnaire != null && (actionnaire as ActionnaireMorale).legal_representative !== undefined;
  }

  // getActionnaireId(actionnaire: ActionnairePhysique | ActionnaireMorale): number | undefined {
  //   if (this.isActionnairePhysique(actionnaire)) {
  //     return actionnaire?.idActPhysique;
  //   } else if (this.isActionnaireMorale(actionnaire)) {
  //     return actionnaire.idActMorale;
  //   }
  //   return undefined;
  // }

  // editAction(actionnaire: ActionnairePhysique | ActionnaireMorale): void {
  //   const actionnaireId = this.getActionnaireId(actionnaire);
  //   if (actionnaireId !== undefined) {
  //     this.router.navigate(['/admin/add-actionnaire', actionnaireId]);
  //   } else {
  //     console.error("L'actionnaire n'a pas d'identifiant valide.");
  //   }
  // }
}
