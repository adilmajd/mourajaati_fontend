import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private TOKEN_KEY = 'Acces token';

  login(token : string){
    localStorage.setItem(this.TOKEN_KEY,token);
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLogedIn():boolean{
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken():string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
