import { Component, OnInit,inject } from '@angular/core';
import { ProfilService } from '../Services/profil.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NgFor],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {

  private profilService = inject(ProfilService)

  public cycles: any[] = [];

  niveaux: any[] = [];

  selectedCycleId: number | null = null;

  public InscriptiondForm = new FormGroup({
    nom:new FormControl('',[Validators.required,Validators.minLength(22)]),
    prenom:new FormControl('',[Validators.required,Validators.minLength(22)]),
    email:new FormControl('',[Validators.required,Validators.minLength(22)]),
    dn:new FormControl('',[Validators.required,Validators.minLength(22)]),
    telephone:new FormControl('',[Validators.required,Validators.minLength(22)]),
    login:new FormControl('',[Validators.required,Validators.minLength(22)]),
    password:new FormControl('',[Validators.required,Validators.minLength(22)]),
    password2:new FormControl('',[Validators.required,Validators.minLength(22)]),
  });

  public load_submit:boolean=false;
  public message:string="";

  ngOnInit(): void {
    this.get_all_cycle();
  }


  get_all_cycle(){
            // Charger les cycles
          this.profilService.getCycles().subscribe({
            next: res => {
              this.cycles = res
              console.log(res)
            },
            error: err => {
              console.error(err);
              this.load_submit=false;
              this.message=err;
              const myModal = new Modal(document.getElementById('password_msg') as HTMLElement);
              myModal.show();
            },complete:()=> {
              this.InscriptiondForm.reset();
              this.load_submit=false;
            }
          
          });
  }

 

}
