import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { KeycloakService } from '../../services/auth/keycloak/keycloak.service';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  // email: string = '';
  // password: string = '';

  // constructor(private authService: AuthService, private router: Router) {}

  // onSubmit() {
  //   this.authService.login(this.email, this.password).subscribe(
  //     response => {
  //       console.log('Connexion réussie', response);
  //       // Redirection vers la page de saisie du code OTP après une connexion réussie
  //       this.router.navigate(['/otp']);
  //     },
  //     error => {
  //       console.error('Erreur de connexion', error);
  //       // Redirection vers la page de connexion en cas d'échec
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }


  // authRequest: AuthenticationRequest = {email: '', password: ''};
  // errorMsg: Array<string> = [];

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const isAuthenticated = await this.keycloakService.init();
      if (isAuthenticated) {
        await this.keycloakService.login();
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erreur d\'authentification', error);
      this.router.navigate(['/login']);
    }
  }

}
