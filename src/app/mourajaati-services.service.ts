import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class MourajaatiServicesService {
  private http = inject(HttpClient); // sert à récupérer un service (comme HttpClient, Router, etc.) sans passer par le constructor
  constructor() { }

  get_all_users(){
    return this.http.get(baseUrl + 'users/users/')
  }
}
