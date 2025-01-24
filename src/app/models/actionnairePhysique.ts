export interface Address {
  street: string;
  city: string;
  postal_code: string;
  country: string;
  is_primary: boolean;
  effective_date: string; // YYYY-MM-DD
}

interface ContactPerson {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface StatusShareholder {
  status: "DRAFT" | "SUBMITTED" | "EXAMINED" | "APPROVED" | "REJECTED";
}
export interface ActionnairePhysique {

  phone_1: string; // Format international: +XX...
  phone_2?: string; // Optionnel
  national_id: string;
  national_id_expiration: Date;
  date_of_birth: Date;
  activity_sector: string;
  effective_date: string; // YYYY-MM-DD
  status: StatusShareholder;
  total_shares: number;
  reference_number: number;
  dividends: number;
  addresses: Address[];
  contact_person: ContactPerson[];
  issuing_company: string;
}

  // Champs supplémentaires pour harmoniser les noms de colonnes
  // nin: string; // Alias pour `national_id`
  // dateExpirationNIN: Date; // Alias pour `national_id_expiration`
  // dateDeNaissance: Date; // Alias pour `date_of_birth`
  // metier: string; // Alias pour `activity_sector`
  // pays: string; // Alias pour `country`