import { Component, OnInit,inject } from '@angular/core';
import { BackendService } from '../../backend.service';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit  {
  private backendService = inject(BackendService)
  public users:any;
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
   this.get_all_users()
  }

  get_all_users(){
    this.backendService.get_all_users().subscribe((data:any)=>{
        console.log(data);
        this.users = data;
    });
  }
}
