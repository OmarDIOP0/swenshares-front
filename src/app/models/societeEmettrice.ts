export interface SocieteEmettrice {
  id: number;
  name: string; // Nom de la société
  description: string | null; // Description
  legal: string; // Statut légal
  logo: string; // URL du logo
  founded_date: Date; // Date de création
  currency: string; // Monnaie
  status_document: string; // URL du document de statut
  internal_regulations_document: string; // URL du document de règlement intérieur
  registration_trade_register: string; // URL du RCCM
  ninea: string; // NINEA
  organization_chart: string; // URL de l'organigramme
  capital_social: number; // Capital social
  number_of_shares: number; // Nombre de parts sociales
  value_of_shares: number; // Valeur des parts sociales
  head_office_address: Address | null; // Adresse du siège social
  status: string; // Statut (ex: DRAFT, APPROVED, etc.)
  notes: string;
  created_by: User | null;
  examined_by: User | null;
  approved_by: User | null;
  created_at: Date;
  updated_at: Date;
  address: Address | null;
  actionnaires: string[];

  // Sous-objets
  adresse: {
    rue: string;
    ville: string;
    boitePostale: string;
    pays: string;
    dateEffet: string;
  };

  sociale: {
    capitalSocial: number;
    nombrePartSocial: number;
    valeurPartSocial: number;
  };

  acteSocial: Array<{
    dateAG: string;
    pvAG: string;
    ancienCapital: number;
    montant: number;
    nouveauCapital: number;
    type: string;
  }>;
}

// Interfaces pour les types liés
export interface Address {
  rue: string;
  ville: string;
  boitePostale: string;
  pays: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
