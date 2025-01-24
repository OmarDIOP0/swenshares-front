import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActionnaireService } from '../../../services/actionnaire.service';
import { FooterComponent } from '../../../shared/layout/footer/footer.component';

// Modules Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { KeycloakService } from '../../../services/auth/keycloak/keycloak.service';
import { D } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-add-actionnaire',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FooterComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-actionnaire.component.html',
  styleUrls: ['./add-actionnaire.component.css'],
})
export class AddActionnaireComponent implements OnInit {
  actionnairePhysiqueForm!: FormGroup;
  actionnaireMoraleForm!: FormGroup;
  actionnaireId: number | null = null;
  shareholderType: 'physique' | 'morale' = 'physique';
  currentUsername!: string;
  userRoles: string[] = [];

  // Comprehensive list of countries
  countries: string[] = [
    'Burkina Faso', 'Cap-Vert', 'Gambie', 'Espagne', 'France', 'Ghana',
    'Guinée', "Côte d'Ivoire", 'Guinée-Bissau', 'Libéria', 'Mali',
    'Mauritanie', 'Niger', 'Nigeria', 'Sénégal', 'Sierra Leone', 'Togo'
  ];

  // Sectors for more comprehensive selection
  activitySectors: string[] = [
    'Technology', 'Finance', 'Healthcare', 'Education',
    'Agriculture', 'Manufacturing', 'Service', 'Consulting'
  ];

  constructor(
    private fb: FormBuilder,
    private actionnaireService: ActionnaireService,
    private route: ActivatedRoute,
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.checkRouteParams();
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    // Get username
    this.currentUsername = this.keycloakService.profile.username || '';
    console.log('username', this.currentUsername);
    // Get user roles
    this.userRoles = this.keycloakService.profile?.roles || [];
    // console.log( 'roles', this.userRoles, 'username', this.currentUsername);
  }

  // Separate method to handle route parameters
  private checkRouteParams(): void {
    this.actionnaireId = this.route.snapshot.paramMap.get('id')
      ? parseInt(this.route.snapshot.paramMap.get('id')!, 10)
      : null;

    if (this.actionnaireId) {
      this.loadExistingActionnaire();
    }
  }

  // Improved method to load existing shareholder data
  private loadExistingActionnaire(): void {
    this.actionnaireService.getActionnaireById(this.actionnaireId!).subscribe({
      next: (data) => {
        if (data.type === 'physique') {
          this.shareholderType = 'physique';
          this.actionnairePhysiqueForm.patchValue(data);
          // Populate addresses and other complex fields
          this.populateAddresses(data.addresses, 'physique');
        } else if (data.type === 'morale') {
          this.shareholderType = 'morale';
          this.actionnaireMoraleForm.patchValue(data);
          this.populateAddresses(data.addresses, 'morale');
        }
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des données de l'actionnaire", error);
        // Consider adding user-friendly error notification
      }
    });
  }

  // Method to populate addresses dynamically
  private populateAddresses(addresses: any[], type: 'physique' | 'morale'): void {
    const addressForm = type === 'physique'
      ? this.actionnairePhysiqueForm.get('addresses') as FormArray
      : this.actionnaireMoraleForm.get('addresses') as FormArray;

    // Clear existing addresses
    while (addressForm.length !== 0) {
      addressForm.removeAt(0);
    }

  }

  // Switch between physical and legal shareholder types
  switchShareholderType(type: 'physique' | 'morale'): void {
    this.shareholderType = type;
  }

  // Comprehensive form initialization
  private initForms(): void {
    this.actionnairePhysiqueForm = this.fb.group({
      // Personal Identification
      national_id: ['', [Validators.required]],
      national_id_expiration: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],

      // Professional Information
      activity_sector: ['', Validators.required],
      // metier: [''],
      issuing_company: ['', Validators.required],

      addresses: this.fb.array([this.createAddressGroup()]), // Un tableau contenant un groupe d'adresse

      // Contact Person
      contact_person: this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.email],
        phone: ['', [Validators.pattern(/^[0-9]{9,14}$/)]],
      }),

      // Shareholding Information
      effective_date: ['', Validators.required],
      status: ['DRAFT', Validators.required],
      total_shares: ['', [Validators.required, Validators.min(1)]],
      reference_number: ['',[Validators.required, Validators.minLength(4)]],
      dividends: ['', [Validators.required, Validators.min(0)]],

      // Additional Information
      is_client: [false],
      // client_account_number: ['', Validators.required],
      is_employee: [false],
      employee_matricule: [''],
      notes: ['']
    });

    // Legal Shareholder Form with comprehensive validation
    this.actionnaireMoraleForm = this.fb.group({
      // Company Information
      company_name: ['', [Validators.required, Validators.minLength(2)]],
      registration_number: ['', Validators.required],
      tax_id: ['', Validators.required],
      activity_sector: ['', Validators.required],
      created_by: [this.currentUsername, Validators.required],

      // Legal Representative
      legal_representative: ['', Validators.required],
      representative_email: ['', [Validators.required, Validators.email]],
      representative_phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,14}$/)]],

      // Identification
      national_id: ['', Validators.required],
      national_id_expiration: ['', Validators.required],

      // Addresses
      addresses: this.fb.array([this.createAddressGroup()]), // Un tableau contenant un groupe d'adresse

      // Contact Person
      contact_person: this.fb.group({
        first_name: [''],
        last_name: [''],
        email: ['', [Validators.email]],
        phone: ['', [Validators.pattern(/^[0-9]{10,14}$/)]],
      }),

      // Shareholding Information
      effective_date: ['', Validators.required],
      status: ['DRAFT', Validators.required],
      total_shares: ['', [Validators.min(0)]],
      reference_number: ['', Validators.required],
      dividends: ['', [Validators.min(0)]],
      capital_percentage: [''],
      group_percentage: [''],

      // Additional Information
      is_group_member: [false],
      effective_beneficiary: [''],
      visa_date: ['', this.dateValidator],
      notes: [''],

      issuing_company: ['']
    });
  }




  // Enhanced address group creation with optional pre-filling
  get addresses(): FormArray {
    return this.actionnairePhysiqueForm.get('addresses') as FormArray;
  }


addAddress(): void {
  this.addresses.push(this.createAddressGroup());
}
removeAddress(index: number): void {
  this.addresses.removeAt(index);
}


getStatusOptions(): string[] {
  if (this.userRoles.includes('admin')) {
    return ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE'];
  } else if (this.userRoles.includes('examiner')) {
    return ['UNDER_REVIEW', 'SUBMITTED'];
  } else if (this.userRoles.includes('approver')) {
    return ['APPROVED', 'REJECTED'];
  }
  return ['DRAFT']; // Default for regular users
}

  async onSubmitPhysique(): Promise<void> {

    if (this.actionnairePhysiqueForm.valid) {
      // const actionnairePhysiqueData = this.actionnairePhysiqueForm.value;
      const actionnairePhysiqueData = {
        ...this.actionnairePhysiqueForm.value,
        created_by: this.currentUsername
      };

      console.log('Données soumises :', actionnairePhysiqueData);

      try {
        const observable = await this.actionnaireService.ajouterActionnairePhysique(actionnairePhysiqueData);
        observable.subscribe(
          response => {
            console.log('Actionnaire physique ajouté avec succès :', response);
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'actionnaire physique :', error);
          }
        );
      } catch (error) {
        console.error('Erreur de préparation de la requête :', error);
      }

      this.router.navigate(['/editeurLayout/actionnaire']);
    } else {
      console.log('Formulaire invalide');
    }
  }


  // // Méthode pour créer un groupe d'adresse
  createAddressGroup(): FormGroup {
    return this.fb.group({
      street: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      postal_code: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      country: [''],
      is_primary: [false],
      effective_date: [''],
    });
  }

  // Create a new Shareholder Morale
  async onSubmitMorale(): Promise<void> {
    if (this.actionnaireMoraleForm.valid) {
      // const actionnaireMoraleData = this.actionnaireMoraleForm.value;
      const actionnaireMoraleData = {
        ...this.actionnaireMoraleForm.value,
        created_by: this.currentUsername
      };

      console.log('Données soumises :', actionnaireMoraleData);

      try {
        const observable = await this.actionnaireService.ajouterActionnaireMorale(actionnaireMoraleData);
        observable.subscribe(
          response => {
            console.log('Actionnaire physique ajouté avec succès :', response);
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'actionnaire physique :', error);
          }
        );
      } catch (error) {
        console.error('Erreur de préparation de la requête :', error);
      }
    } else {
      console.log('Formulaire invalide');
    }
  }


  // Utility method to mark all controls as touched to show validation errors
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }

      if (control instanceof FormArray) {
        control.controls.forEach(ctrl => {
          if (ctrl instanceof FormGroup) {
            this.markFormGroupTouched(ctrl);
          }
        });
      }
    });
  }

  // Custom validator for date
  private dateValidator(control: any): {[key: string]: any} | null {
    const today = new Date();
    const inputDate = new Date(control.value);

    if (inputDate > today) {
      return { 'futureDate': true };
    }

    const age = today.getFullYear() - inputDate.getFullYear();
    if (age < 18) {
      return { 'underAge': true };
    }

    return null;
  }
}
