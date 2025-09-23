import { Component,OnInit,inject } from '@angular/core';
import { NgForOf } from "@angular/common";
import { BackendService } from '../../Services/backend.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { AdminService } from '../../Services/admin.service';
import { FormsModule } from '@angular/forms';


interface Cours {
  cours_id: number;
  cours_titre: string;
  type_cours: { type_cours_id: number; type_cours_nom: string };
}
@Component({
  selector: 'app-cours-read',
  standalone: true,
  imports: [NgForOf,CommonModule,FormsModule],
  templateUrl: './cours-read.component.html',
  styleUrl: './cours-read.component.css'
})
export class CoursReadComponent implements OnInit {
  ngOnInit(): void {
    this.loadCours(this.authService.getNiveauId());
  }

  private backService = inject(BackendService)
  private authService = inject(AuthService)
  selectedType: string | null = null;
  selectedTypeId: number | null = null;
  public List_Type: any[] = [];
  groupedCours: { [typeNom: string]: Cours[] } = {};

  loadCours(niveauId: any) {
    this.List_Type=[]
    this.backService.list_cours_type(niveauId).subscribe({
      next: (res: any[]) => {
        // Initialiser objet vide
        this.groupedCours = {};
  
        // Parcourir les cours et regrouper par type
        res.forEach(cours => {
          const typeNom = cours.type_cours.type_cours_nom;
  
          if (!this.groupedCours[typeNom]) {
            this.groupedCours[typeNom] = [];
          }
          this.groupedCours[typeNom].push(cours);
        });
  
        console.log("Grouped cours:", this.groupedCours);
      },
      error: (err) => {
        console.error("Erreur:", err);
      }
    });
  }


}
