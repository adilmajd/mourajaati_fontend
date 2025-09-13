import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfilComponent } from './profil/profil.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';

export const routes: Routes = [
    {
        path:"",
        component:AccueilComponent
    }
    ,
    {
        path:"login",
        component:LoginComponent,
        title:"Login"
    }
    ,
    {
        path:"profil",
        component:ProfilComponent,
        canActivate:[authGuard],
        title:"Pofil"
    }
    ,
    {
        path:"admin",
        component:AdminComponent,
        canActivate:[authGuard],
        data: {roles:['admin']},
        title:"Admin",
        children:[
            {
                path:"users",// admin/users
                component:UsersComponent,
                title:"Gestion utilsateurs"
            }
            ,
            {
                path:"acceuil",// admin/acceuil
                component:AccueilComponent,
                title:"Page d'administration"
            }
    ]
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
