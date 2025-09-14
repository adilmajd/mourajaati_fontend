import { Component, OnInit,inject } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AdminService } from '../../admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  {
  private adminService = inject(AdminService)
  public users:any;
  public input_login:string="";
  public input_nom:string="";
  public input_prenom:string="";

  get_all_users(){
    this.adminService.get_all_users().subscribe((data:any)=>{
        console.log(data);
        this.users = data;
    });
  }

  serach_users(){
    this.adminService.search_users(this.input_login,this.input_nom,this.input_prenom).subscribe((data:any)=>{
      console.log(data)
      this.users = data;
    });
  }


/*
    params.set('prenom',e.target.value)
    this.adminService.search_users(params).subscribe((data:any)=>{
      console.log(data)
    });
    */
  
}
