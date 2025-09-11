import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
    {
        path:"dashbord",
        component:LoginComponent,
        canActivate:[authGuard]},
    {
        path:"login",
        component:LoginComponent
    },{
        path:"unauthorized",
        component:UnauthorizedComponent
    },
    {
        path:"",
        component:AccueilComponent
    }

];
