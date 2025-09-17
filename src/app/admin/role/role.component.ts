import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../admin.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [NgForOf, FormsModule, NgIf],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  private adminService = inject(AdminService);
  public all_roles:any;
  public all_permissions:any;
  public input_role: string="";
  public input_Permission: string="";
  public delete_role_id: number | null = null;
  public delete_permission_id: number | null = null;

  public load_role_bool:boolean=false;
  public delete_role_bool:boolean=false;

  public load_permission_bool:boolean=false;
  ngOnInit(): void {
    this.get_all_roles();
    this.get_all_permissions();
  }

  get_all_roles(){
    this.load_role_bool=true;
    this.adminService.get_all_roles().subscribe({
      next: (data) => {
        this.all_roles = data;
        console.log(data);
      },
      error: (err) => {
        this.load_role_bool=false;
      },complete:()=> {
        this.load_role_bool=false;
      }
    });
  }

  get_all_permissions(){
    this.load_permission_bool=true;
    this.adminService.get_all_permissions().subscribe({
      next: (data) => {
        this.all_permissions = data;
        console.log(data);
      },
      error: (err) => {
        this.load_permission_bool=false;
      },complete:()=> {
        this.load_permission_bool=false;
      }
    });
  }

  create_role(){
    this.adminService.create_role(this.input_role).subscribe({
      next: (data) => {
        this.all_roles=null;
        this.get_all_roles();
        console.log(data);
      },
      error: (err) => {
        this.input_role="";
      },complete:()=> {
        this.input_role="";
      }
    });
  }

  create_permission(){
    this.adminService.create_permission(this.input_Permission).subscribe({
      next: (data) => {
        this.all_permissions=null;
        this.get_all_permissions();
        console.log(data);
      },
      error: (err) => {
        this.input_Permission="";
      },complete:()=> {
        this.input_Permission="";
      }
    });
  }

  delete_roles(role_id:number){
    this.delete_role_id = role_id; 
    this.adminService.delete_roles(role_id).subscribe({
      next: (data) => {
        this.all_roles=null;
        this.get_all_roles();
        console.log(data);
      },
      error: (err) => {
        this.delete_role_id = null;
      },complete:()=> {
        this.delete_role_id = null;
      }
    });
  }

  delete_permission(permission_id:number){
    this.delete_permission_id = permission_id; 
    this.adminService.delete_permission(permission_id).subscribe({
      next: (data) => {
        this.all_permissions=null;
        this.get_all_permissions();
        console.log(data);
      },
      error: (err) => {
        this.delete_permission_id = null;
      },complete:()=> {
        this.delete_permission_id = null;
      }
    });
  }
}



/*
    params.set('prenom',e.target.value)
    this.adminService.search_users(params).subscribe((data:any)=>{
      console.log(data)
    });
    */
