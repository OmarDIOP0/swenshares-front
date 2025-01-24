import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  user = {
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    password: '',
    confPassword: '',
    type: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.user.password !== this.user.confPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    this.authService.register(this.user).subscribe(response => {
      console.log(response);
      // Redirection vers la page de connexion après une inscription réussie
      this.router.navigate(['/login']);
    });
  }
}
