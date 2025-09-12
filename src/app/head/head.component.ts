import { Component,inject } from '@angular/core';
import { RouterLink,Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {
  public auth_serv = inject(AuthService);
  private router = inject(Router);

  logout(){
    this.auth_serv.logout();
    this.router.navigate(['/login'])
  }
}
