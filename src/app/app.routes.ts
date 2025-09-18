import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfilComponent } from './profil/profil.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { RoleComponent } from './admin/role/role.component';
import { AvatarComponent } from './profil/avatar/avatar.component';
import { PasswordComponent } from './profil/password/password.component';

export const routes: Routes = [
    {
        path:"",
        component:AccueilComponent,
        pathMatch:"full"
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
        title:"Pofil",
        children:[
            {
                path:"avatar",
                component:AvatarComponent,
                title:"Gestion des utilsateurs Avatar"
            },
            {
                path:"password",
                component:PasswordComponent,
                title:"Gestion des utilsateurs Password"
            }
    ]
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
                title:"Gestion des utilsateurs"
            }
            ,
            {
                path:"acceuil",// admin/acceuil
                component:AccueilComponent,
                title:"Page d'administration"
            }
            ,
            {
                path:"role",// admin/role
                component:RoleComponent,
                title:"Gestion des rôles"
            }
    ]
    }
    ,
    {
        path:"404",
        component:ErrorComponent,
        title:"Error"
    },
    {
        path:"unauthorized",
        component:UnauthorizedComponent,
        title:"unauthorized"
    }
    

];
