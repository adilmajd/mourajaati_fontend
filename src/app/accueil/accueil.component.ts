import { Component ,inject} from '@angular/core';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  public backendService = inject(BackendService);

  test_lire(){
    this.backendService.test_lire().subscribe((data:any)=>{
      console.log(data);
  });
  }
  get_all_users(){
    this.backendService.get_all_users().subscribe((data:any)=>{
        console.log(data);
    });
  }
}
