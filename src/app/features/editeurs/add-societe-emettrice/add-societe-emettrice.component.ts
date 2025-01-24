import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/layout/footer/footer.component';
import { KeycloakService } from '../../../services/auth/keycloak/keycloak.service';
import { SocieteEmettriceService } from '../../../services/societe-emettrice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocialActService } from '../../../services/actes-sociales.service';
import { SocieteEmettrice } from '../../../models/societeEmettrice';

@Component({
  selector: 'app-add-societe-emettrice',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule],
  templateUrl: './add-societe-emettrice.component.html',
  styleUrl: './add-societe-emettrice.component.css'
})
export class AddSocieteEmettriceComponent implements OnInit {
  societeForm!: FormGroup;
  socialActForm!: FormGroup;
  isSidebarOpen = true;
  showAddressForm = false;
  currentUsername!: string;
  societes: SocieteEmettrice[] = [];
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private societeService: SocieteEmettriceService,
              private router: Router, private keycloakService: KeycloakService,
              private socialActservice: SocialActService, private snackBar: MatSnackBar) {}
  countries: string[] = [
    'Burkina Faso', 'Cap-Vert', 'Gambie', 'Espagne', 'France', 'Ghana',
    'Guinée', "Côte d'Ivoire", 'Guinée-Bissau', 'Libéria', 'Mali',
    'Mauritanie', 'Niger', 'Nigeria', 'Sénégal', 'Sierra Leone', 'Togo'
  ];

  private initForm(): void {
    this.societeForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      legal: ['', Validators.required],
      logo: [''],
      founded_date: ['', Validators.required],
      currency: ['FCFA'],
      status_document: [''],
      internal_regulations_document: [''],
      registration_trade_register: [''],
      ninea: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(/^\d+$/)]],
      organization_chart: [''],
      capital_social: ['', [Validators.required, Validators.min(0.01)]],
      number_of_shares: ['', [Validators.required, Validators.min(0)]],
      value_of_shares: ['', [Validators.required, Validators.min(0.01)]],
      status: ['SUBMITTED'],
      created_by: [this.currentUsername, Validators.required],
      notes: [''],
      head_office_address: this.fb.array([this.createAddressGroup()], Validators.required)
    });
  }

  private initSocialAct(): void {
    this.socialActForm = this.fb.group({
      general_assembly_pv: ['', Validators.required],
      date: ['', Validators.required],
      general_assembly_type: ['ORDINARY', Validators.required],
      social_act_type: ['STORE_INCORPORATION', Validators.required],
      older_capital: ['', [Validators.required, Validators.min(0.01)]],
      new_capital: ['', [Validators.required, Validators.min(0.01)]],
      amount: [''],
      issuing_company_id: [''],
      status: ['SUBMITTED'],
      notes: [''],
    });
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      street: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      postal_code: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      country: ['Sénégal', Validators.required],
      effective_date: [new Date().toISOString()]
    });
  }

  get headOfficeAddresses(): FormArray {
    return this.societeForm.get('head_office_address') as FormArray;
  }

  addAddress(): void {
    this.headOfficeAddresses.push(this.createAddressGroup());
  }

  removeAddress(index: number): void {
    if (this.headOfficeAddresses.length > 1) {
      this.headOfficeAddresses.removeAt(index);
    } else {
      this.openSnackBar('Au moins une adresse est requise', 'Fermer');
    }
  }

  toggleAddressForm(): void {
    this.showAddressForm = !this.showAddressForm;
  }

  ngOnInit(): void {
    this.loadUserInfo();
    this.initForm();
    this.initSocialAct();
    this.fetchSocietes();
  }

  private loadUserInfo(): void {
    this.currentUsername = this.keycloakService.profile.username || '';
    console.log('username', this.currentUsername);
  }

  async onSubmit(): Promise<void> {
    if (this.societeForm.valid && this.headOfficeAddresses.length > 0) {
      this.isLoading = true;
      const formData = new FormData();

      const { head_office_address, ...formValues} = this.societeForm.value;

      Object.keys(formValues).forEach(key => {
        const value = formValues[key];
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });


      const fileFields = ['logo', 'status_document', 'internal_regulations_document',
                         'registration_trade_register', 'organization_chart'];

      fileFields.forEach(field => {
        const file = this.societeForm.get(field)?.value;
        if (file instanceof File) {
          formData.append(field, file, file.name);
        }
      });

      const primaryAddress = this.headOfficeAddresses.at(0).value;
      const addressData = {
        street: primaryAddress.street,
        city: primaryAddress.city,
        postal_code: primaryAddress.postal_code,
        country: primaryAddress.country,
        effective_date: primaryAddress.effective_date || new Date().toISOString()
      };

      formData.append('head_office_address', JSON.stringify(addressData));

      try {
        const response = await (await this.societeService.createSocieteEmettrice(formData)).toPromise();
        this.isLoading = false;
        this.openSnackBar('Société créée avec succès', 'Fermer');
        this.router.navigate(['/view/societe-emettrice']);
      } catch (error: any) {
        this.isLoading = false;
        const errorMessage = error.error?.head_office_address?.[0] ||
                           error.error?.message ||
                           'Erreur lors de la création';
        this.openSnackBar(errorMessage, 'Fermer');
        console.error('Erreur détaillée:', error);
      }
    } else {
      this.markFormGroupTouched(this.societeForm);
      const errorMessage = this.headOfficeAddresses.length === 0
        ? 'Veuillez ajouter au moins une adresse'
        : 'Veuillez remplir tous les champs obligatoires';
      this.openSnackBar(errorMessage, 'Fermer');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  async onSubmiSocialAct(): Promise<void> {
    if (this.socialActForm.valid) {
      this.isLoading = true;
      const formData = new FormData();
      Object.keys(this.socialActForm.controls).forEach(key => {
        const control = this.socialActForm.get(key);
        if (key === 'general_assembly_pv' && control?.value instanceof File) {
          formData.append(key, control.value, control.value.name);
        } else {
          formData.append(key, control?.value);
        }
      });

      try {
        const observable = await this.socialActservice.createSocialAct(formData);
        observable.subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log('Acte créé avec succès', response);
            this.router.navigate(['/editeurLayout/add-societeEmettrice']);
            this.openSnackBar('Acte créé avec succès', 'Fermer');
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Erreur détaillée:', error);
            this.openSnackBar(error.message || 'Erreur lors de la création', 'Fermer');
          }
        });
      } catch (error) {
        this.isLoading = false;
        console.error('Erreur de soumission', error);
        this.openSnackBar('Erreur de soumission', 'Fermer');
      }
    } else {
      Object.keys(this.socialActForm.controls).forEach(key => {
        const control = this.socialActForm.get(key);
        if (control?.errors) {
          console.log(`Erreurs pour ${key}:`, control.errors);
        }
      });
      this.openSnackBar('Veuillez remplir correctement tous les champs obligatoires', 'Fermer');
    }
  }

  fetchSocietes(): void {
    this.societeService.getAllSocietesEmettrices().subscribe({
      next: (data) => {
        this.societes = data;
        console.log('Societes récupérées', data);
        this.openSnackBar('Sociétés récupérées avec succès', 'Fermer');
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des sociétés : ', error);
        this.openSnackBar('Erreur lors de la récupération des sociétés', 'Fermer');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onFileSelectedActSocial(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.socialActForm.get(field)?.setValue(file);
    }
  }

  onFileSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.societeForm.get(field)?.setValue(file);
    }
  }
}
