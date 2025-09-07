import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {

}
