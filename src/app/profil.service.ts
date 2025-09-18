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
  
  
}
