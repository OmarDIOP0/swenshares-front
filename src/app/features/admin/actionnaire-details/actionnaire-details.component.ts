import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-actionnaire-details',
  standalone: true,
  imports: [CommonModule,RouterModule,MatPaginator],
  templateUrl: './actionnaire-details.component.html',
  styleUrl: './actionnaire-details.component.css'
})
export class ActionnaireDetailsComponent implements OnInit{

  actionnaire:any;
  id?:any;
  pageEvent?:PageEvent;
  pageSize:number=5;
  p1:number=1;

  transactionUser=[
    {
      id: 1,
      type: 'Achat',
      quantite: 10,
      prix: 15000,
      actionnaire: "Ousmane Fall",
      date: "2024-01-13",
      statut: 'Active'
    }
  ]
  physicalShareholders = [
    {
      id: 1,
      nom: 'Issa Faye',
      email: 'issa.faye@example.com',
      telephone: '+221 77 612 56 78',
      adresse: { rue: '12 Rue du Commerce', boitePostale: 'BP 10400', ville: 'Medina', pays: 'Senegal' },
      pays: 'Senegal',
      nombreActions: 50,
      pourcentageCapital: 10,
      secteurActivite: 'Technologie',
      groupe: 'Groupe A',
      appartenanceGroupeBeneficiaire: 'Oui',
      dividendes: 5000,
      effectif: 100,
      personneContact: { nom: 'Mamadou Sylla', telephone: '+221 76 987 54 32' },
      transactions: [1]
    },
  ];


  constructor(private route:ActivatedRoute){
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.actionnaire = this.physicalShareholders.find(shareholder => shareholder.id === this.id);
  }

}
