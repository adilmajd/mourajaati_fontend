import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit{
  ngOnInit(): void {
    this.loadCours()
  }

  private adminService = inject(AdminService)
  public coursList: any[] = [];
  public niveaux: any[] = [];   
  public typeCours: any[] = [];  

  //this.coursList = data;
  loadCours() {
    this.adminService.getCoursNvType().subscribe({
      next: (res) => {
        this.coursList = res;
        console.log(res)
      },
      error: (err) => {

      },
      complete:()=> {

      }
    });
  }

  onChange(cours: any) {
    const payload = {
      niveau_id: cours.niveau.niveau_id,
      type_cours_id: cours.type_cours.type_cours_id
    };
    this.adminService.updateCoursNvType(cours.cours_id, payload).subscribe();
  }
}
