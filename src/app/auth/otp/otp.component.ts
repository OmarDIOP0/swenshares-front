import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OtpService } from '../../services/auth/otp.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otp!: string;
  phoneNumber: string = '221 XXXXXX0894'; // Exemple de numéro de téléphone

  constructor(private otpService: OtpService, private router: Router) {}

  onOtpSubmit() {
    this.otpService.verifyOtp(this.otp).subscribe(
      response => {
        if (response.success) {
          // Rediriger vers l'interface en fonction du profil de l'utilisateur
          switch (response.userProfile) {
            case 'administrateur':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'approbateur':
              this.router.navigate(['/approbateur-dashboard']);
              break;
            case 'examinateur':
              this.router.navigate(['/examinateur-dashboard']);
              break;
            case 'reviewer':
              this.router.navigate(['/reviewer-dashboard']);
              break;
            default:
              this.router.navigate(['/default-dashboard']);
              break;
          }
        } else {
          // Gérer l'échec de la vérification
          alert('OTP invalide. Veuillez réessayer.');
        }
      },
      error => {
        console.error('Erreur lors de la vérification de l\'OTP', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }

  resendOtp() {
    this.otpService.resendOtp(this.phoneNumber).subscribe(
      response => {
        if (response.success) {
          alert('OTP renvoyé avec succès.');
        } else {
          alert('Échec de l\'envoi de l\'OTP. Veuillez réessayer.');
        }
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'OTP', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }
}
