import { Component,inject,OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { LoginComponent } from "../login/login.component";
import { AdminComponent } from "../admin/admin.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-contenu',
  standalone: true,
  imports: [LoginComponent, AdminComponent, RouterOutlet],
  templateUrl: './contenu.component.html',
  styleUrl: './contenu.component.css'
})
export class ContenuComponent implements OnInit {

  private back_serv = inject(BackendService);

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get_all_users_c(){
    this.back_serv.get_all_users().subscribe(
      (data:any)=>{
        console.log(data)
      }
    );
  }

}
