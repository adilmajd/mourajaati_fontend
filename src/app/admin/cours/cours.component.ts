import { Component, OnInit, inject,NgModule, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Modal } from 'bootstrap';
import { ProfilService } from '../../Services/profil.service';
import { AuthService } from '../../Services/auth.service';
import katex from 'katex';


@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.loadCours()
    this.charger_cycle_niveau()
    this.myModal_ajouter = new Modal(document.getElementById('gestion_ajouter_cours') as HTMLElement); 
    this.myModal_ecrire_cours = new Modal(document.getElementById('insert_cours') as HTMLElement); 
  }


  myModal_ajouter!: Modal;
  myModal_ecrire_cours!: Modal;
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
  public input_contenu_cours:string="";
  public input_ajouter_nom:string | null | undefined ="";
  public cycles: any[] = [];
  selectedCycleId: number | null = null;
  selectedniveauId: number | null = null;
  selectedTypeId: number | null = null;
  fontSizes: number[] = [10,12,14,16,18,20,24,28,32,36,48];


  //this.coursList = data;
  loadCours() {
    this.message="";
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
          this.message="Erreur suppression";
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
    this.message="";
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

  ecrire_modifer_Cours(cours: any){
    this.input_edit_id=cours.cours_id;
    this.input_contenu_cours="";
  
      this.adminService.get_cours_contenu(cours.cours_id).subscribe({
        next: (res:any) => {
          this.input_contenu_cours=res.contenu;
          this.onInputChange();
          this.myModal_ecrire_cours.show();
        },
        error: (err) => {
        }
      });
    
  }
  @ViewChild('preview', { static: true }) previewEl!: ElementRef;
  onInputChange() {

    let html = this.parseBBCode(this.input_contenu_cours);


    html = html.replace(/\$(.+?)\$/g, (match, formula) => {
      try {
        return katex.renderToString(formula, { throwOnError: false });
      } catch {
        return match; 
      }
    });
    html = html.replace(/\n/g, '<br>');

    this.previewEl.nativeElement.innerHTML = html;
  }
  parseBBCode(text: string): string {
    return text
      .replace(/\[b\](.*?)\[\/b\]/g, "<b>$1</b>")
      .replace(/\[i\](.*?)\[\/i\]/g, "<i>$1</i>")
      .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>")
      .replace(/\[s\](.*?)\[\/s\]/g, "<span style='text-decoration: line-through;'>$1</span>")
      .replace(/\[code\](.*?)\[\/code\]/g, "<pre><code>$1</code></pre>")
      .replace(/\[center\](.*?)\[\/center\]/g, "<div style='text-align:center;'>$1</div>")
      .replace(/\[left\](.*?)\[\/left\]/g, "<div style='text-align:left;'>$1</div>")
      .replace(/\[right\](.*?)\[\/right\]/g, "<div style='text-align:right;'>$1</div>")
      .replace(/\[color=(.*?)\](.*?)\[\/color\]/g, "<span style='color:$1;'>$2</span>")
      .replace(/\[bgcolor=(.*?)\](.*?)\[\/bgcolor\]/g, "<span style='background-color:$1;'>$2</span>")
      .replace(/\[size=(\d+)\](.*?)\[\/size\]/g, "<span style='font-size:$1px;'>$2</span>")
      .replace(/\[math\](.*?)\[\/math\]/gs, (match, content) => {
        return `$${content}$`;
      })
      .replace(/\[table\](.*?)\[\/table\]/gs, (match, tableContent) => {
        // Transformer chaque ligne [tr]…[/tr]
        const rows = tableContent.match(/\[tr\](.*?)\[\/tr\]/gs);
        if (!rows) return match;
    
        const htmlRows = rows.map((row:any) => {
          const cells = row.match(/\[td\](.*?)\[\/td\]/gs);
          if (!cells) return '';
          const htmlCells = cells.map((cell:any) => cell.replace(/\[td\](.*?)\[\/td\]/s, '<td style="border:1px solid black;">$1</td>'));
          return `<tr>${htmlCells.join('')}</tr>`;
        });
        return `<table class="table" border="1" style="border-collapse: collapse;" >${htmlRows.join('')}</table>`;
      })
      .replace(/\[img\](.*?)\[\/img\]/g, `<img src="$1" style="max-width:100%; height:auto;" class="mx-auto d-block">`);
  }
  @ViewChild('textareaEl', { static: true }) textareaEl!: ElementRef<HTMLTextAreaElement>;
  wrapSelection(openTag: string, closeTag: string) {
    const textarea = this.textareaEl.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = this.input_contenu_cours.substring(start, end);

    // Remplacer la sélection par la sélection encadrée par BBCode
    this.input_contenu_cours = this.input_contenu_cours.substring(0, start) + openTag + selected + closeTag + this.input_contenu_cours.substring(end);

    // Repositionner le curseur après le texte inséré
    const newPos = start + openTag.length + selected.length + closeTag.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newPos, newPos);
    }, 0);

    // Mettre à jour l'aperçu
    this.onInputChange();
  }

  applyColor(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.wrapSelection(`[color=${value}]`, `[/color]`);
  }

  applyBgColor(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.wrapSelection(`[bgcolor=${value}]`, `[/bgcolor]`);
  }


  applySize(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) return;
    this.wrapSelection(`[size=${value}]`, `[/size]`);
  }


  /*
             <div class="table-style-toolbar mb-2">
            <label>Largeur table:</label>
            <input type="number" #tableWidth placeholder="px" (input)="updateTableStyle('width', tableWidth.value)">
            
            <label>Bordure:</label>
            <input type="number" #tableBorder placeholder="px" (input)="updateTableStyle('border', tableBorder.value)">
          </div>

   */
updateTableStyle(property: 'width' | 'border', value: string) {
  // 1) récupérer le HTML actuel affiché (preview)
  let html = this.previewEl?.nativeElement?.innerHTML ?? this.input_contenu_cours ?? '';

  // 2) modifier les balises <table ...>
  html = html.replace(/<table\b([^>]*)>/gi, (match :any, attrs:any) => {
    // récupérer style existant
    let style = '';
    const styleMatch = attrs.match(/style\s*=\s*"(.*?)"/i);
    if (styleMatch) style = styleMatch[1];

    // mettre à jour la propriété demandée
    if (property === 'width') {
      style = style.replace(/(?:^|;)\s*width\s*:\s*[^;]+;?/i, '');
      style = (style ? style + ';' : '') + `width:${value}px;`;
    } else if (property === 'border') {
      style = style.replace(/(?:^|;)\s*border\s*:\s*[^;]+;?/i, '');
      style = (style ? style + ';' : '') + `border:${value}px solid black;`;
    }

    // retirer ancien style attr puis reconstruire <table style="...">
    const attrsWithoutStyle = attrs.replace(/\s*style\s*=\s*"(.*?)"/i, '');
    return `<table${attrsWithoutStyle} style="${style}">`;
  });

  // 3) si on modifie border, mettre aussi le border sur <td> et <th>
  if (property === 'border') {
    html = html.replace(/<(td|th)\b([^>]*)>/gi, (match:any, tag:any, attrs:any) => {
      let style = '';
      const styleMatch = attrs.match(/style\s*=\s*"(.*?)"/i);
      if (styleMatch) style = styleMatch[1];
      style = style.replace(/(?:^|;)\s*border\s*:\s*[^;]+;?/i, '');
      style = (style ? style + ';' : '') + `border:${value}px solid black;`;
      const attrsWithoutStyle = attrs.replace(/\s*style\s*=\s*"(.*?)"/i, '');
      return `<${tag}${attrsWithoutStyle} style="${style}">`;
    });
  }

  // 4) mettre à jour l'aperçu
  this.previewEl.nativeElement.innerHTML = html;
  this.input_contenu_cours = html;
}

updateContenu() {
  this.message="";
  if (!this.input_edit_id || !this.input_contenu_cours || this.input_contenu_cours.trim() === '') {
    this.message = 'Veuillez saisir un contenu valide';
    return;
  }

  this.adminService.updateCoursContenu(this.authService.getUserId(),this.input_edit_id, this.input_contenu_cours).subscribe({
    next: (res) => {
      this.message = 'Contenu mis à jour avec succès !';
      console.log(res);
    },
    error: (err) => {
      this.message = 'Erreur lors de la mise à jour';
      console.error(err);
    }
  });
}

}
