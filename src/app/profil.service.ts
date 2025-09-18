import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '..//environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private http = inject(HttpClient);
  public baseUrl = environment.apiUrl;

  constructor() { }

  uploadAvatar(userId: string, file: File): Observable<any> {
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append("file", file);
  
    return this.http.post(`${this.baseUrl}users/user/${userId}/avatar`, formData,{headers});
  }

  getAvatar(userId: any): Observable<any> {
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get(`${this.baseUrl}users/user/${userId}/avatar`,{headers});
  }

  updatePassword(userId: any, password1: any, password2: any): Observable<any> {
    const token = localStorage.getItem("Acces token");  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const payload = {
      "password1": password1,
      "password2": password2
    };

    return this.http.put(`${this.baseUrl}users/user/${userId}/password`,payload,{headers});
  }
  

  getCycles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}base/cycles`);
  }

  getNiveaux(cycleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}base/cycles/${cycleId}/niveaux`);
  }

  getUserNiveau(userId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}base/user/${userId}/niveau`);
  }
  
}
