import { Component,OnInit,inject } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-typecours',
  standalone: true,
  imports: [NgForOf, FormsModule, NgIf],
  templateUrl: './typecours.component.html',
  styleUrl: './typecours.component.css'
})
export class TypecoursComponent implements OnInit {
  ngOnInit(): void {
    this.get_all_types()
  }
  public input_type:string=""
  private adminServices = inject(AdminService)
  public load_type_bool:boolean=false;
  public all_types:any;
  public delete_type_id:number=0;

  public input_edit_nom:string=""
  public input_edit_id:number=0

  create_type(){
    this.adminServices.create_type(this.input_type).subscribe({
      next: (data) => {
        this.all_types=null;
        this.get_all_types();
        console.log(data);
      },
      error: (err) => {
        this.input_type="";
      },complete:()=> {
        this.input_type="";
      }
    });
  }

  get_all_types(){
    this.load_type_bool=true;
    this.adminServices.get_all_types().subscribe({
      next: (data) => {
        this.all_types = data;
        console.log(data);
      },
      error: (err) => {
        this.load_type_bool=false;
        console.log(err);
      },complete:()=> {
        this.load_type_bool=false;
      }
    });
  }

  delete_types(type_cours_id:number){
    this.delete_type_id = type_cours_id; 
    this.adminServices.delete_types(type_cours_id).subscribe({
      next: (data) => {
        this.all_types=null;
        this.get_all_types();
        console.log(data);
      },
      error: (err) => {
        this.delete_type_id = 0;
      },complete:()=> {
        this.delete_type_id = 0;
      }
    });
  }

  edit_type(input_edit_id:number, input_edit_nom:string){
    this.input_edit_id=input_edit_id;
    this.input_edit_nom=input_edit_nom;
    const myModal = new Modal(document.getElementById('type_modal') as HTMLElement);
          myModal.show();

  }

  edit_type_back(input_edit_id:number){
    this.input_edit_id = input_edit_id; 
    this.adminServices.updateType(input_edit_id,this.input_edit_nom).subscribe({
      next: (data) => {
        this.all_types=null;
        this.get_all_types();
        console.log(data);
      },
      error: (err) => {
        this.input_edit_id = 0;
      },complete:()=> {
        this.input_edit_id = 0;
      }
    });
  }

}
