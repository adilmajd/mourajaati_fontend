import { Component,inject } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private back_serv = inject(BackendService);
  login="adil";
  password="1234";
  message="";

  auth(){
    this.back_serv.login(this.login,this.password).subscribe(
      {
        next: (response) => {
          this.message = response.message; // "Connexion réussie"
          console.log(response.user);
        },
        error: (err) => {
          this.message = err.error.detail; // "Identifiants invalides..."
        }
      }
    );
  }
}
