import { Injectable, } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private TOKEN_KEY = 'Acces token';
  private ROLE_KEY = 'roles';
  private PERMISSION_KEY = 'permissions';
  private user_KEY = 'user_id';
  private niveau_KEY = 'niveau';

  private token: string | null = null;
  private roles: string[] = [];
  private permissions: string[] = [];

  login(token : string,roles:string[],permissions:string[],user_id:string,niveau:string){
    localStorage.setItem(this.TOKEN_KEY,token);
    localStorage.setItem(this.ROLE_KEY,JSON.stringify(roles));
    localStorage.setItem(this.PERMISSION_KEY,JSON.stringify(permissions));
    localStorage.setItem(this.user_KEY,user_id);
    localStorage.setItem(this.niveau_KEY,niveau);
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.PERMISSION_KEY);
    localStorage.removeItem(this.user_KEY);
    localStorage.removeItem(this.niveau_KEY);
  }

  isLogedIn():boolean{
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken():string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRoles():string[]{
    return JSON.parse(localStorage.getItem(this.ROLE_KEY) || '[]'); // || <> ou or
  }

  getPermissions():string[]{
    return JSON.parse(localStorage.getItem(this.PERMISSION_KEY) || '[]'); // || <> ou or
  }

  getUserId():string | null{
    return localStorage.getItem(this.user_KEY); // || <> ou or
  }

  getNiveauId():string | null{
    return localStorage.getItem(this.niveau_KEY); // || <> ou or
  }

  hasRole(role:string):boolean{
    const roles =  JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes(role);
  }

  hasPermissions(permission:string):boolean{
    const permissions = this.permissions.length
      ? this.permissions
      : JSON.parse(localStorage.getItem('permissions') || '[]');
    return permissions.includes(permission);  }
}
