import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:"dashbord",component:LoginComponent,canActivate:[authGuard]},
    {path:"login",component:LoginComponent},

];
