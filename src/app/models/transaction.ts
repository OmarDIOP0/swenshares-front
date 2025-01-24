export class Transaction {
  id: number;
  prix: number;
  dateTransaction: Date;
  document: string; // Ajout du champ 'document'
  confidentialite: boolean; // Ajout du champ 'confidentialite'
  validite: boolean; // Ajout du champ 'validite'
  actionnaireId: number; // Ajout du champ 'actionnaireId'

  constructor(
    id: number,
    prix: number,
    date: string,
    document: string,
    confidentialite: boolean,
    validite: boolean,
    actionnaireId: number
  ) {
    this.id = id;
    this.prix = prix;
    this.dateTransaction = new Date(date);
    this.document = document;
    this.confidentialite = confidentialite;
    this.validite = validite;
    this.actionnaireId = actionnaireId;
  }
}