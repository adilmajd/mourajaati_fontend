import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
const baseUrl = 'http://127.0.0.1:8000/';
const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  
  constructor() { }

  get_all_users():Observable<any>{
    return this.http.get(baseUrl + 'users/users/',{headers})
  }

  search_users(login:string,nom:string,prenom:string):Observable<any>{
    if(login.length == 0 && nom.length == 0  && prenom.length == 0 ){
      return of([])
    }else{
      let params = new HttpParams()
  .set('login',login).set('nom',nom).set('prenom',prenom);
    return this.http.get(baseUrl + 'users/users_search',{params,headers})
    }
   
  }
}
