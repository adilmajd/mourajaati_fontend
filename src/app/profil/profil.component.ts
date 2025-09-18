import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

}
