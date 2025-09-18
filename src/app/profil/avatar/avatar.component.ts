import { Component, OnInit, inject } from '@angular/core';
import { ProfilService } from '../../profil.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit{
  ngOnInit(): void {
    this.getAvatar();
  }
  public avatar:string=""
  private profilService = inject(ProfilService);
  public authService = inject(AuthService);
  public load_img:boolean=false;
  

  onFileSelected(event: any, userId: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.load_img=true;
      this.profilService.uploadAvatar(userId, file).subscribe({
        next: (res) => {
        },
        error: (err) => {
          console.error("Erreur upload:", err);
          this.load_img=false;
        },
        complete:()=> {
          this.load_img=false;
          this.getAvatar();
          const myModal = new Modal(document.getElementById('Avatar_user') as HTMLElement);
          myModal.show();
        }
      });
    }
  }

  getAvatar():any{
      this.profilService.getAvatar(this.authService.getUserId()).subscribe({
        next: (res) => {
          this.avatar=this.profilService.baseUrl+res;
        },
        error: (err) => {
          this.avatar="";
          console.error( err);
        },
        complete:()=> {
          
        }
      });
  }
  
}
