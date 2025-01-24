import { Address, StatusShareholder } from "./actionnairePhysique";

interface ContactPersonMorale {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
  updated_at: string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
}

export interface ActionnaireMorale {
  id: string; // UUID
  company_name: string;
  registration_number: string; // Numéro d'immatriculation
  tax_id: string; // Identifiant fiscal
  legal_representative: string; // Nom du représentant légal
  representative_email: string;  // Email du REPRESENTANT 
  representative_phone: string;
  capital_percentage: number; // Pourcentage
  is_group_member: boolean; // Indique si membre d’un groupe
  group_percentage?: number | null; // Optionnel
  addresses: Address[];
  effective_beneficiary: number; // Pourcentage
  visa_date: string; // YYYY-MM-DD
  contact_person: ContactPersonMorale;
  created_by?: string | null; // Optionnel
  examined_by?: string | null; // Optionnel
  approved_by?: string | null; // Optionnel
  status: StatusShareholder['status'];
  effective_date: string; // YYYY-MM-DD Date d’effet
  activity_sector: string;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
  notes?: string; // Optionnel
  total_shares: number;
  dividends: any[]; // Si les dividendes nécessitent une structure, spécifiez-la
  reference_number: string; // Numéro de référence
  issuing_company: string | number; // Identifiant ou nom de l’entreprise émettrice
}
