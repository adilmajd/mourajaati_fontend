import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContenuComponent } from "./contenu/contenu.component";
import { HeadComponent } from './head/head.component';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContenuComponent, HeadComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mourajaati';
}
