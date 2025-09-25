import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  public baseUrl = environment.apiUrl;
  
  constructor() { }

  get_all_users():Observable<any>{
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}users/users/`,{headers})
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
    return this.http.get(`${this.baseUrl}users/users_search`,{params,headers})
    }
  }

  get_roles_permissions_by_user(user_id_public:string):Observable<any>{
    
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}users/user/`+user_id_public+'/roles-permissions',{headers});
  }

  get_all_roles():Observable<any>{
    
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.http.get(`${this.baseUrl}users/roles/`,{headers});
  }

  get_all_permissions():Observable<any>{
    
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.http.get(`${this.baseUrl}users/permissions/`,{headers});
  }

  update_user_roles(user_id: string, role_ids: number[]): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.baseUrl}users/user/${user_id}/roles`, { role_ids },{headers});
  }

  get_etat_by_user(user_id_public:string):Observable<any>{
    
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}users/user/`+user_id_public+'/etat',{headers});
  }

  get_all_etat():Observable<any>{
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}users/etats/`,{headers});
  }

  updateUserEtat(userId: string, etatId: number): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.baseUrl}users/user/${userId}/etat/${etatId}`, {headers});
  }

  create_role(role_name:string): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}users/roles/`, { role_name }, {headers});
  }

  create_permission(permission_name:string): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}users/permissions/`, { permission_name }, {headers});
  }

  delete_roles(role_id:number): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}users/roles/${role_id}`, {headers});
  }

  delete_permission(permission_id:number): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}users/permissions/${permission_id}`, {headers});
  }

  getRolePermissions(role_id: number): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}users/roles/${role_id}/permissions`, {headers});
  }

  addPermissionToRole(role_id: number, permission_id: number) {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}users/roles/${role_id}/permissions/${permission_id}`, {headers});
  }
  
  removePermissionFromRole(role_id: number, permission_id: number) {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}users/roles/${role_id}/permissions/${permission_id}`,{headers});
  }

  create_type(type_cours_nom:string): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}cours/type/`, { type_cours_nom }, {headers});
  }

  get_all_types():Observable<any>{
    
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.http.get(`${this.baseUrl}cours/types/`,{headers});
  }

  delete_types(type_cours_id:number): Observable<any> {
    const token = localStorage.getItem("Acces token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}cours/type/${type_cours_id}`, {headers});
  }

  updateType(type_cours_id: any, type_cours_nom: any): Observable<any> {
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const payload = {
      "type_cours_nom": type_cours_nom,
    };

    return this.http.put(`${this.baseUrl}cours/type/${type_cours_id}`,payload,{headers});
  }



  getListNiveaux(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}base/niveaux/`);
  }

  getListTypeCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}cours/types/`);
  }


  getCoursNvType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}cours/cours_nv_typ`);
  }

  updateCoursNvType(coursId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}cours/cour/${coursId}`, data);
  }

  updateCoursTitre(cours_id: number, nouveauTitre: string) {
    return this.http.put(`${this.baseUrl}cours/cour/${cours_id}`, { cours_titre: nouveauTitre });
  }
  
  deleteCours(cours_id: number) {
    return this.http.delete(`${this.baseUrl}cours/cour/${cours_id}`);
  }

  addCours(cours: {cours_titre: string, niveau_id: number, type_cours_id: number,user_public_id:string}): Observable<any> {
    return this.http.post(`${this.baseUrl}cours/cour/`, cours);
  }

  get_cours_contenu(cours_id:number){
    return this.http.get<any>(`${this.baseUrl}cours/cours_contenu/${cours_id}`)
  }

  updateCoursContenu(user_public_id:any,cours_id: number, contenu: string): Observable<any> {
    const body = { cours_id, contenu };
    return this.http.put(`${this.baseUrl}cours/update-contenu/${user_public_id}`, body);
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