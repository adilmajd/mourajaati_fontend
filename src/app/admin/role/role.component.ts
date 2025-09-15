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
  public input_role: string="";
  public delete_role_id: number | null = null;

  public load_role_bool:boolean=false;
  public delete_role_bool:boolean=false;
  ngOnInit(): void {
    this.get_all_roles();
  }

  get_all_roles(){
    this.load_role_bool=true;
    this.adminService.get_all_roles().subscribe({
      next: (data) => {
        this.all_roles = data;
        console.log(data);
      },
      error: (err) => {
      },complete:()=> {
        this.load_role_bool=false;
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
      },complete:()=> {
        this.input_role="";
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
      },complete:()=> {
        this.delete_role_id = null;
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
