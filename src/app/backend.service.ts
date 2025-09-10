import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private http = inject(HttpClient); // sert à récupérer un service (comme HttpClient, Router, etc.) sans passer par le constructor

  constructor() { }
  login(login:any,password:any):Observable<any>{
    return this.http.post<any>(baseUrl+"users/login",{login,password})
  }






  get_all_users(){
    return this.http.get(baseUrl + 'users/users/')
  }

  testme(){
    const token = localStorage.getItem("token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl+"users/test_me",{headers});
  }

  test_lire(){
    const token = localStorage.getItem("token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl + 'users/lire/',{headers})
  }

  test_ecrire(){
    const token = localStorage.getItem("token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl + 'users/ecrire/',{headers})
  }
  
}

