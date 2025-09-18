import { NgIf } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfilService } from '../../profil.service';
import { AuthService } from '../../auth.service';
import { Modal } from 'bootstrap';

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

  passwordMatchValidator(form: FormGroup) {
    return form.get('password1')!.value === form.get('password2')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
    const password1 = this.passwordForm.value.password1
    const password2 =  this.passwordForm.value.password2
    
      this.profilService.updatePassword(this.authService.getUserId(),password1,password2).subscribe({
        next: res => {
          console.log(res.message); // afficher message succès
          const myModal = new Modal(document.getElementById('password_msg')!);
          myModal.show();
          this.passwordForm.reset();
        },
        error: err => {
          console.error(err);
        },complete:()=> {
          this.passwordForm.reset();
        },
      });
    } else {
      alert("Formulaire invalide")
    }
  }
}
