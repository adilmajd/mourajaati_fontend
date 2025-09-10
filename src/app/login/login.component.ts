import { Component,inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormGroup,FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private back_serv = inject(BackendService);
  public auth_serv = inject(AuthService);
  message="";
  data_token=""
  public load:boolean=false;

  loginForm = new FormGroup({
    username:new FormControl(''),
    password:new FormControl('')
  });

  onSubmit(){
    this.load=true;
    //this.back_serv.login(this.login,this.password).subscribe(
    this.back_serv.login(this.loginForm.value["username"],this.loginForm.value["password"]).subscribe(
      {
        next: (response) => {
          this.message = response.message; // "Connexion réussie"
          this.data_token = response.user.access_token;
          this.auth_serv.login(this.data_token)
          console.log(this.message)
          console.log(this.data_token)
        },
        error: (err) => {
          this.load=false;
          this.message = err.error.detail; // "Identifiants invalides..."
          console.log(this.message)
        },
        
        complete:() => {
          //terminer
          this.load=false;
        }
        
      }
    );
  }

/*
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
  */
}
