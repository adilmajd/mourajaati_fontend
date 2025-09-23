import { Component, OnInit, inject,NgModule  } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Modal } from 'bootstrap';
import { ProfilService } from '../../Services/profil.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit{
  ngOnInit(): void {
    this.loadCours()
    this.charger_cycle_niveau()
    this.myModal_ajouter = new Modal(document.getElementById('gestion_ajouter_cours') as HTMLElement); 
  }
  myModal_ajouter!: Modal;
  private adminService = inject(AdminService)
  private profilService = inject(ProfilService)
  private authService = inject(AuthService)
  public coursList: any[] = [];
  public niveaux: any[] = [];   
  public niveaux_cycle: any[] = [];   
  public typeCours: any[] = [];  
  public message:string="";
  public input_edit_nom:string="";
  public input_edit_id:any;
  public input_ajouter_nom:string | null | undefined ="";
  public cycles: any[] = [];
  selectedCycleId: number | null = null;
  selectedniveauId: number | null = null;
  selectedTypeId: number | null = null;

  //this.coursList = data;
  loadCours() {
    forkJoin({
      cours: this.adminService.getCoursNvType(),
      niveaux: this.adminService.getListNiveaux(),
      typeCours: this.adminService.getListTypeCours()
    }).subscribe({
      next: (result) => {
        this.coursList = result.cours;
        this.niveaux = result.niveaux;
        this.typeCours = result.typeCours;
  
        console.log("Cours =>", this.coursList);
        console.log("Niveaux =>", this.niveaux);
        console.log("TypeCours =>", this.typeCours);
      },
      error: (err) => {
        console.error("Erreur chargement :", err);
      }
    });
  }

  onChange(cours: any) {
    const payload = {
      niveau_id: cours.niveau.niveau_id,
      type_cours_id: cours.type_cours.type_cours_id
    };
    this.adminService.updateCoursNvType(cours.cours_id, payload).subscribe({
      next: (res) => {
        this.typeCours = res;
        console.log(res)
      },
      error: (err) => {
        console.log(err)
        this.message="Erreur : Veuiller contacter admin !"
        const myModal = new Modal(document.getElementById('gestion_cours') as HTMLElement);
          myModal.show();
      },
      complete:()=> {
        this.message="La modification a été effectué !"
        const myModal = new Modal(document.getElementById('gestion_cours') as HTMLElement);
          myModal.show();
      }
    });
  }

  modifier_nom(cours_titre:string,cours_id:number){
    this.message="";
    this.input_edit_id=cours_id;
    this.input_edit_nom=cours_titre;
    const myModal = new Modal(document.getElementById('gestion_modifier_cours') as HTMLElement);
    myModal.show();
  }

  update_nom_cours(input_edit_id:number,input_edit_nom:string){
    this.message="";
    this.adminService.updateCoursTitre(input_edit_id,input_edit_nom).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        this.message="erreur !"
        console.log(err)
      },
      complete:()=> {
        this.message="La modification a été effectué !"
        this.loadCours();
      }
    });
  }

  supprimerCours(cours: any) {
    if (confirm(`Voulez-vous vraiment supprimer le cours : "${cours.cours_titre}" ?`)) {
      this.adminService.deleteCours(cours.cours_id).subscribe({
        next: () => {
          console.log("Cours supprimé avec succès");
          // Supprimer du tableau local
          this.coursList = this.coursList.filter(c => c.cours_id !== cours.cours_id);
        },
        error: (err) => {
          console.error("Erreur suppression :", err);
        }
      });
    }
  }

  ajouter(){
    this.message="";
    this.myModal_ajouter.show();
  }

  Ajouter_cours_back(input_ajouter_nom:string | null | undefined ){
    if (!input_ajouter_nom || input_ajouter_nom.trim() === "" || !this.selectedniveauId || !this.selectedTypeId){
      this.message="Veuillez remplir le nom !"
    }else{
      this.adminService.addCours({
        cours_titre: String(this.input_ajouter_nom),
        niveau_id: this.selectedniveauId,
        type_cours_id: this.selectedTypeId,
        user_public_id: String(this.authService.getUserId())
      }).subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message;
          // Réinitialiser le formulaire
          this.input_ajouter_nom = '';
          this.selectedniveauId = null;
          this.selectedTypeId = null;
          this.loadCours(); // recharge la liste si besoin
        },
        error: (err) => {
          console.error(err);
          this.message = "Erreur lors de l'ajout du cours !";
        },complete: () => {
          this.myModal_ajouter.hide();
        },
      });
    }
  }
  
  charger_cycle_niveau(){
    this.profilService.getCycles().subscribe({
      next: (res) => {
        this.cycles = res;

        // définir selectedCycleId par défaut si ce n’est pas encore défini
        if (!this.selectedCycleId && this.cycles.length > 0) {
          this.selectedCycleId = this.cycles[0].cycle_id;
        }
        this.loadNiveaux(this.selectedCycleId!);
        console.log(res)
      },
      error: (err) => {
        this.message="erreur !"
        console.log(err)
      },
      complete:()=> {
        this.myModal_ajouter.hide();
        this.loadCours();
      }
    });

  }

  loadNiveaux(selectedCycleId: any) {
    //const selectElement = event.target as HTMLSelectElement;
    //const selectedValue = selectElement.value;
    console.log(selectedCycleId)
    this.profilService.getNiveaux(selectedCycleId).subscribe({
      next: (res:any) => {
        this.niveaux_cycle = res
      },
      error: (err) => {
        console.error("Erreur :", err);
      },
      complete:()=> {
      }
    });
  }

  select_niveau(selectedniveauId:any){
    this.selectedniveauId=selectedniveauId;
  }

  select_type(selectedTypeId:any){
    this.selectedTypeId=selectedTypeId
  }
}
