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
  login="adil"; //lire
  password="1234";
  message="";
  data_token=""

  auth(){
    this.back_serv.login(this.login,this.password).subscribe(
      {
        next: (response) => {
          this.message = response.message; // "Connexion réussie"
          this.data_token = response.user.access_token;
          localStorage.setItem("token",this.data_token);
          console.log(localStorage.getItem("token"));
          
          
          
        },
        error: (err) => {
          this.message = err.error.detail; // "Identifiants invalides..."
        }
      }
    );
  }


  testme(){
    
    this.back_serv.testme().subscribe(
      (data:any)=>{
        console.log({"data message":data})
      }
    );
    
    console.log({"data message":localStorage.getItem("token")})
  }

  test_lire(){
    this.back_serv.test_lire().subscribe(
      (data:any)=>{
        console.log({"data message":data})
      }
    );
  }

  test_ecrire(){
    this.back_serv.test_ecrire().subscribe(
      (data:any)=>{
        console.log({"data message":data})
      }
    );
  }
}
