import { Component, OnInit, inject } from '@angular/core';
import { ProfilService } from '../../Services/profil.service';
import { AuthService } from '../../Services/auth.service';
import { Iuserdetails } from '../../model/iuserdetails';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [NgIf],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent implements OnInit{
  public avatar:string="";
  private profilService = inject(ProfilService);
  public authService = inject(AuthService);
  public user?: Iuserdetails;
  public load_info:boolean=false;
  ngOnInit(): void {
    this.load_info=true;
    this.profilService.getUserDetails(this.authService.getUserId()).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
        this.avatar=this.profilService.baseUrl+this.user?.avatar
      },
      error: (err) => {
        console.error('Erreur de chargement user:', err);
        this.load_info=false;
      },complete:()=> {
        this.load_info=false;
      },
    });
  }

}
