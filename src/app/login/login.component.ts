import { Component,inject } from '@angular/core';
import { BackendService } from '../Services/backend.service';
import { FormGroup,FormsModule,ReactiveFormsModule,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Modal } from 'bootstrap';

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
  public message_err:string="";
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

            try {
              this.message = response.message; // "Connexion réussie"
              let data_token = response.user.access_token;
              let data_roles = response.user.roles;
              let data_permissions = response.user.permissions;
              let user_id = response.user.user_id;
              let niveau_id = response.user.niveau;
              this.auth_serv.login(data_token,data_roles,data_permissions,user_id,niveau_id)
              console.log(this.message)
              console.log(data_token)
              console.log(data_roles)
              console.log(data_permissions)
              console.log(niveau_id)

              this.message = "Bonjour !"; 
              const myModal = new Modal(document.getElementById('login_user') as HTMLElement);
              myModal.show();
            } catch (error) {
              this.message = "probleme de connection !"; 
              const myModal = new Modal(document.getElementById('login_user') as HTMLElement);
              myModal.show();
            }

           
            
          },
          error: (err:any) => {
            
            this.load=false;
            this.message = err.error.detail; // "Identifiants invalides..."
            //console.log(this.message)
            const myModal = new Modal(document.getElementById('login_user') as HTMLElement);
            myModal.show();
            
            
          },
          
          complete:() => {
            //terminer
            this.load=false;
          }
        }
      );
    }


  }
}
