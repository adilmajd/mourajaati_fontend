import { NgIf } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfilService } from '../../Services/profil.service';
import { AuthService } from '../../Services/auth.service';
import { Modal } from 'bootstrap';

//const 

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,NgIf],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  
  private profilService = inject(ProfilService);
  private authService = inject(AuthService);
  public passwordForm = new FormGroup({
    password1:new FormControl('',[Validators.required,Validators.minLength(6)]),
    password2:new FormControl('',[Validators.required,Validators.minLength(6)])
  });
  public load_update_password:boolean=false;
  public message:string="";



  passwordMatchValidator(form: FormGroup) {
    return form.get('password1')!.value === form.get('password2')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    this.message="";
    if (this.passwordForm.valid) {
      if(this.passwordMatchValidator(this.passwordForm)){
        //alert("Les chmaps ne sont pas identiques")
        this.message="Les chmaps ne sont pas identiques";
        const myModal = new Modal(document.getElementById('password_msg') as HTMLElement);
                    myModal.show();
      }else{
              this.load_update_password=true;
              const password1 = this.passwordForm.value.password1
              const password2 =  this.passwordForm.value.password2
              
                this.profilService.updatePassword(this.authService.getUserId(),password1,password2).subscribe({
                  next: res => {
                    console.log(res.message); // afficher message succès
                    this.message="Mot de passe mis à jour !";
                    const myModal = new Modal(document.getElementById('password_msg') as HTMLElement);
                    myModal.show();

                    this.passwordForm.reset();
                  },
                  error: err => {
                    console.error(err);
                    this.load_update_password=false;
                    this.message=err;
                    const myModal = new Modal(document.getElementById('password_msg') as HTMLElement);
                    myModal.show();
                  },complete:()=> {
                    this.passwordForm.reset();
                    this.load_update_password=false;
                  },
                });
      }

    } else {
      alert("Formulaire invalide")
    }
  }
}
