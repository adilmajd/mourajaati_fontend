import { Component, OnInit,inject } from '@angular/core';
import { ProfilService } from '../../profil.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-niveau',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './niveau.component.html',
  styleUrl: './niveau.component.css'
})
export class NiveauComponent implements OnInit {
  private profilService = inject(ProfilService);
  public authService = inject(AuthService);
  cycles: any[] = [];
  niveaux: any[] = [];
  selectedCycleId: number | null = null;
  userNiveauId: number | null = null;
  public load_cycle_niveau_bool:boolean=false;
  public message:string="";

  ngOnInit(): void {
    this.charger_cycle_niveau()
  }

  charger_cycle_niveau(){
        // Charger les cycles
        this.profilService.getCycles().subscribe(res => this.cycles = res);

        // Charger le niveau utilisateur
        const userId = this.authService.getUserId(); // récupéré du token
        this.profilService.getUserNiveau(userId).subscribe(userNiveau => {
          this.userNiveauId = userNiveau.niveau_id;
          this.selectedCycleId = userNiveau.cycle_id;
    
          // Charger les niveaux de ce cycle
          this.loadNiveaux(this.selectedCycleId!);
        });
  }

  loadNiveaux(cycleId: number) {
    this.load_cycle_niveau_bool=true;
    this.selectedCycleId = cycleId;
    this.profilService.getNiveaux(cycleId).subscribe({
      next: (res:any) => {
        this.niveaux = res
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.load_cycle_niveau_bool=false;
        this.message=err
        const myModal = new Modal(document.getElementById('cycle_niveau') as HTMLElement);
        myModal.show();
      },
      complete:()=> {
        this.load_cycle_niveau_bool=false;
      }
    });
  }

  onNiveauChange(niveauId: number) {
    this.profilService.updateUserNiveau(this.authService.getUserId(), niveauId)
      .subscribe({
        next: res => {
          console.log(res.message);
          this.charger_cycle_niveau()
          this.message="Le niveau mis à jour !"
          const myModal = new Modal(document.getElementById('cycle_niveau') as HTMLElement);
          myModal.show();

        },
        error: (err) => {
          console.error("Erreur :", err);
          this.message=err
          const myModal = new Modal(document.getElementById('cycle_niveau') as HTMLElement);
          myModal.show();
        }        
      });
    }
}
