import { Component,inject,OnInit } from '@angular/core';
import { MourajaatiServicesService } from '../mourajaati-services.service';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-contenu',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './contenu.component.html',
  styleUrl: './contenu.component.css'
})
export class ContenuComponent implements OnInit {

  private back_serv = inject(MourajaatiServicesService);

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
