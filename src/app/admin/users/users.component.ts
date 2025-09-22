import { Component, OnInit,inject } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AdminService } from '../../Services/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  {
  private adminService = inject(AdminService)
  public users:any;
  public roles_by_user:any;
  public etat_by_user:any;
  public roles_id_user:number[] = [];
  public etat_id:number=0;
  public all_roles:any;
  public all_etats:any;
  public input_login:string="";
  public input_nom:string="";
  public input_prenom:string="";
  selectedRoles: number[] = [];

  public nom:string="";
  public prenom:string="";
  public user_id_public:string="";
  public erreur:string="";
  public succes:string="";

  public load_user_bool:boolean=false;
  public load_role_user_bool:boolean=false;
  public load_role:boolean=false;
  public load_etat:boolean=false;
  public affiche_role:boolean=false;
  public affiche_etat:boolean=false;

  serach_users(){
    this.erreur="";
    this.succes="";
    this.load_user_bool=true;
    this.adminService.search_users(this.input_login,this.input_nom,this.input_prenom).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.erreur=err;
      },complete:() =>{
        this.load_user_bool=false;
      },
    });
  }

  get_roles_permissions_by_user(user_id_public:string,nom:string,prenom:string){
    this.affiche_etat=false;
    this.erreur="";
    this.succes="";
    this.nom=nom;
    this.prenom=prenom;
    this.user_id_public=user_id_public;
    this.load_role_user_bool=true;
    this.affiche_role=true;
    this.roles_id_user = [];
    this.selectedRoles = [];
    this.roles_by_user = null;
    this.adminService.get_roles_permissions_by_user(user_id_public).subscribe({
      next: (data:any)=>{
        this.roles_by_user=data.roles;
        this.roles_by_user.forEach((element:any) => {
          this.roles_id_user.push(element.role_id);
          this.selectedRoles.push(element.role_id);
        });
        this.get_all_roles(); 
      },
      error:(err)=> {
        console.log(err)
      },
      complete:()=>{
        this.load_role_user_bool=false;
      }
    }
    );
  }

  get_all_roles(){
    this.erreur="";
    this.succes="";
    this.all_roles = null;
    this.adminService.get_all_roles().subscribe({
      next: (data:any)=>{
        this.all_roles=data;
      },
      error:(err) => {
        this.erreur=err;
      },
      complete:()=>{

      }
    }
    );
  }

  update_user_roles(event: any, roleId: number){
    this.erreur="";
    this.succes="";
    if (event.target.checked) {
      this.selectedRoles.push(roleId);
    } else {
      const index = this.selectedRoles.indexOf(roleId);
      if (index > -1) this.selectedRoles.splice(index, 1);
    }
    this.load_role=true;
    this.adminService.update_user_roles(this.user_id_public, this.selectedRoles).subscribe({
      next: (data) => {
        this.succes=data;
      },
      error: (err) => {
        this.erreur=err;
      },complete:()=> {
        this.load_role=false;
      },
    });
  }

  get_etat_by_user(user_id_public:string,nom:string,prenom:string){
    this.load_role_user_bool=true;
    this.erreur="";
    this.succes="";
    this.nom=nom;
    this.prenom=prenom;
    this.user_id_public=user_id_public;
    this.affiche_role=false;
    this.affiche_etat=true
    this.adminService.get_etat_by_user(user_id_public).subscribe({
      next: (data:any)=>{
        console.log(data);
        this.etat_id = data.etat_id
        this.get_all_etats();
      },
      error:(err)=> {
        console.log(err)
      },
      complete:()=>{
        this.load_role_user_bool=false;
      }
    }
    );
  }
  get_all_etats(){
    this.erreur="";
    this.succes="";
    this.all_etats = null;
    this.adminService.get_all_etat().subscribe({
      next: (data:any)=>{
        this.all_etats=data;
      },
      error:(err) => {
        this.erreur=err;
      },
      complete:()=>{

      }
    }
    );
  }

  update_user_etat(etatId: number){
    this.erreur="";
    this.succes="";
    this.load_etat=true;
    this.adminService.updateUserEtat(this.user_id_public,etatId).subscribe({
      next: (data) => {
        this.succes=data.message;
        console.log(data)
      },
      error: (err) => {
        this.erreur=err;
      },complete:()=> {
        this.load_etat=false;
      }
    });
  }

/*
    params.set('prenom',e.target.value)
    this.adminService.search_users(params).subscribe((data:any)=>{
      console.log(data)
    });
    */
  
}
