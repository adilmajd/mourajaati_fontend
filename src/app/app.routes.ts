import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfilComponent } from './profil/profil.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {
        path:"",
        component:AccueilComponent
    }
    ,
    {
        path:"login",
        component:LoginComponent
    }
    ,
    {
        path:"profil",
        component:ProfilComponent,
        canActivate:[authGuard],
    }
    ,
    {
        path:"admin",
        component:AdminComponent,
        canActivate:[authGuard],
        data: {roles:['admin']},
    }
    ,
    {
        path:"404",
        component:ErrorComponent
    },
    {
        path:"unauthorized",
        component:UnauthorizedComponent
    }
    

];
