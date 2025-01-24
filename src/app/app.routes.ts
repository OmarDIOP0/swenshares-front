import { Routes } from '@angular/router';
import { ConnexionComponent } from './auth/connexion/connexion.component';
import { ActionnairesComponent } from './features/actionnaires/actionnaires.component';
// import { RoleGuard } from './services/auth/guard/auth.guard';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { OtpComponent } from './auth/otp/otp.component';


import { AdminLayoutComponent } from './features/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ActionnaireComponent } from './features/admin/actionnaire/actionnaire.component';
import { ActionnaireDetailsComponent } from './features/admin/actionnaire-details/actionnaire-details.component';
import { ActionComponent } from './features/admin/action/action.component';
import { SocieteEmettriceComponent } from './features/admin/societe-emettrice/societe-emettrice.component';
import { TransactionComponent } from './features/admin/transaction/transaction.component';
import { UserManagementComponent } from './features/admin/user-management/user-management.component';
import { ProfileComponent } from './features/admin/profile/profile.component';
import { ApprobateurLayoutComponent } from './features/layouts/approbateur-layout/approbateur-layout.component';
import { DashboardApprobateurComponent } from './features/approbateur/dashboard-approbateur/dashboard-approbateur.component';
import { TransactionApprobateurComponent } from './features/approbateur/transaction-approbateur/transaction-approbateur.component';
import { ActionnaireApprobateurComponent } from './features/approbateur/actionnaire-approbateur/actionnaire-approbateur.component';
import { ActionnaireViewDetailApprobateurComponent } from './features/approbateur/actionnaire-view-detail-approbateur/actionnaire-view-detail-approbateur.component';
import { ProfileApprobateurComponent } from './features/approbateur/profile-approbateur/profile-approbateur.component';
import { TransactionFormComponent } from './features/admin/transaction-form/transaction-form.component';
import { AddActionnaireComponent } from './features/editeurs/add-actionnaire/add-actionnaire.component';
import { AddSocieteEmettriceComponent } from './features/editeurs/add-societe-emettrice/add-societe-emettrice.component';
import { EditeursComponent } from './features/editeurs/editeurs.component';
import { ReviewerComponent } from './features/reviewer/reviewer.component';
import { EditeurLayoutComponent } from './features/layouts/editeur-layout/editeur-layout.component';
import { ReviewerLayoutComponent } from './features/layouts/reviewer-layout/reviewer-layout.component';
import { ActionnaireReviewerComponent } from './features/reviewer/actionnaire-reviewer/actionnaire-reviewer.component';
import { TransactionReviewerComponent } from './features/reviewer/transaction-reviewer/transaction-reviewer.component';
import { AuthGuard } from './services/guard/auth.guard';
import { ViewlayoutComponent } from './features/layouts/viewlayout/viewlayout.component';
import { SocieteEmettriceDetailsComponent } from './features/admin/societe-emettrice-details/societe-emettrice-details.component';
import { SocieteEmettriceApprobateurComponent } from './features/approbateur/societe-emettrice-approbateur/societe-emettrice-approbateur.component';

export const routes: Routes = [
  { path: 'register', component: InscriptionComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'login', component: ConnexionComponent, pathMatch: 'full' },

  // Routes accessibles à tous
  {
    path: 'view',
    component: ViewlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: 'actionnaires', component: ActionnaireComponent },
      {path:'actionnaires',component: ActionnaireComponent,data: { breadcrumb: 'Actionnaire' } },
      { path: 'actionnaire/view-detail/:id', component: ActionnaireDetailsComponent },
      { path: 'societe-emettrice', component: SocieteEmettriceComponent },
      { path: 'transactions', component: TransactionComponent },
    ],
  },

  // Routes spécifiques par rôle
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
      { path: 'user-management', component: UserManagementComponent, data: { breadcrumb: 'User Management' } },
      {path:'societe-emettrice',component:SocieteEmettriceComponent , data: { breadcrumb: 'Societe Emettrice' } },
      {path:'societe-emettrice-details/:id',component:SocieteEmettriceDetailsComponent },
      { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Profile' } },
    ],
  },

  {
    path: 'editeurLayout',
    component: EditeurLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'editeur', component: EditeursComponent },
      { path: 'add-actionnaire', component: AddActionnaireComponent },
      { path: 'add-societeEmettrice', component: AddSocieteEmettriceComponent },
      { path: 'transactionForm', component: TransactionFormComponent },
    ],
  },

  {
    path: 'reviewerLayout',
    component: ReviewerLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'reviewer', component: ReviewerComponent },
      { path: 'actionnaireReviewer', component: ActionnaireReviewerComponent },
      { path: 'transactionReviewer', component: TransactionReviewerComponent },
    ],
  },

  {
    path: 'approbateur',
    component: ApprobateurLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardApprobateurComponent },
      { path: 'transaction', component: TransactionApprobateurComponent },
      { path: 'actionnaire', component: ActionnaireApprobateurComponent },
      {path:'societe-emettrice',component:SocieteEmettriceApprobateurComponent},
      { path: 'profile', component: ProfileApprobateurComponent },
    ],
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut
];
