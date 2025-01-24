import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Transaction } from '../../../models/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'], // Correction de styleUrl à styleUrls
})
export class TransactionFormComponent {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire
    this.transactionForm = this.fb.group({
      prix: ['', [Validators.required, Validators.min(0)]],
      dateTransaction: ['', Validators.required],
      document: [null, Validators.required], // Changez à null pour le fichier
      confidentialite: [false],
      validite: [false],
      actionnaireId: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // Méthode pour gérer le changement de fichier
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.transactionForm.patchValue({
        document: file, // Stocker le fichier dans le champ document
      });
      this.transactionForm.get('document')?.updateValueAndValidity(); // Mettre à jour la validité
    }
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transaction: Transaction = {
        id: Math.floor(Math.random() * 1000), // Génération d'un ID fictif
        prix: this.transactionForm.value.prix,
        dateTransaction: new Date(this.transactionForm.value.dateTransaction),
        document: this.transactionForm.value.document, // Le fichier sélectionné
        confidentialite: this.transactionForm.value.confidentialite,
        validite: this.transactionForm.value.validite,
        actionnaireId: this.transactionForm.value.actionnaireId,
      };

      console.log('Transaction soumise:', transaction);
      // Appeler le service pour enregistrer la transaction
    } else {
      console.log('Formulaire invalide');
    }
  }
}
