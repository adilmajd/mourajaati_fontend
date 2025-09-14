import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
const baseUrl = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  
  constructor() { }

  get_all_users():Observable<any>{
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl + 'users/users/',{headers})
  }

  search_users(login:string,nom:string,prenom:string):Observable<any>{
    if(login.length == 0 && nom.length == 0  && prenom.length == 0 ){
      return of([])
    }else{
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
      let params = new HttpParams()
  .set('login',login).set('nom',nom).set('prenom',prenom);
    return this.http.get(baseUrl + 'users/users_search',{params,headers})
    }
  }

  get_roles_permissions_by_user(user_id_public:string):Observable<any>{
    
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl + 'users/user/'+user_id_public+'/roles-permissions',{headers});
  }

  get_all_roles():Observable<any>{
    
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.http.get(baseUrl + 'users/roles/',{headers});
  }

  update_user_roles(user_id: string, role_ids: number[]): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${baseUrl}users/user/${user_id}/roles`, { role_ids },{headers});
  }

  get_etat_by_user(user_id_public:string):Observable<any>{
    
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl + 'users/user/'+user_id_public+'/etat',{headers});
  }

  get_all_etat():Observable<any>{
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(baseUrl + 'users/etats/',{headers});
  }

  updateUserEtat(userId: string, etatId: number): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${baseUrl}users/user/${userId}/etat/${etatId}`, {headers});
  }
}



/*
const token = localStorage.getItem("Acces token");  
const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
});


  let params = new HttpParams()
.set('login',login).set('nom',nom).set('prenom',prenom);
*/