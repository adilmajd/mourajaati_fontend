import { Component, OnInit,inject } from '@angular/core';
import { ProfilService } from '../../profil.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  ngOnInit(): void {
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
    this.selectedCycleId = cycleId;
    this.profilService.getNiveaux(cycleId).subscribe(res => this.niveaux = res);
  }

}
