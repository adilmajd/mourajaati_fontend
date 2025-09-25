import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

const baseUrl = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public baseUrl = environment.apiUrl;
  private http = inject(HttpClient); // sert à récupérer un service (comme HttpClient, Router, etc.) sans passer par le constructor

  constructor() { }
  login(login:any,password:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}users/login`,{login,password})
  }

  list_cours_type(niveau_id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}cours/cours_typ/${niveau_id}`)
  }









  testme(){
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl+"users/test_me",{headers});
  }

  test_lire(){
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl + 'users/lire/',{headers})
  }

  test_ecrire(){
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl + 'users/ecrire/',{headers})
  }
  
}

