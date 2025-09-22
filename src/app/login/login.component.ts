import { Component,inject } from '@angular/core';
import { BackendService } from '../Services/backend.service';
import { FormGroup,FormsModule,ReactiveFormsModule,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private back_serv = inject(BackendService);
  public auth_serv = inject(AuthService);
  message="";
  public load:boolean=false;

  public loginForm = new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(3)]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)])
  });

  onSubmit(){
    if(this.loginForm.invalid){
      alert("Veuiller remplir les champs !")
    }else{
      this.load=true;
      //this.back_serv.login(this.login,this.password).subscribe(
      this.back_serv.login(this.loginForm.value["username"],this.loginForm.value["password"]).subscribe(
        {
          next: (response) => {
            this.message = response.message; // "Connexion réussie"
            let data_token = response.user.access_token;
            let data_roles = response.user.roles;
            let data_permissions = response.user.permissions;
            let user_id = response.user.user_id;
            this.auth_serv.login(data_token,data_roles,data_permissions,user_id)
            console.log(this.message)
            console.log(data_token)
            console.log(data_roles)
            console.log(data_permissions)
            
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
