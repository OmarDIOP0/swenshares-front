import { SocieteEmettrice, User } from "./societeEmettrice";

export interface ActeSocial {
  id: number;
  issuing_company: {
    id: number;
    name: string;
    // autres propriétés de la société
  };
  date: string;
  general_assembly_type: string;
  social_act_type: string;
  older_capital: string;
  new_capital: string;
  amount: string;
  status: string;
  general_assembly_pv?: string;
}
