import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isLogedIn())
  {

    if (Array.isArray(route.data['roles'])) {
      //vérifier les roles
      const requiredroles = route.data['roles'] as string[];
      let hasAtLeastOne = requiredroles.some(r => auth.hasRole(r));
      if (!hasAtLeastOne) {
        console.log('[authGuard] accès refusé, au moins une des roles requises:', requiredroles);
        return router.createUrlTree(['/unauthorized']);
      }

    } 
    else if (Array.isArray(route.data['permissions'])) 
    {
            //vérifier les permissions
      const requiredPermissions = route.data['permissions'] as string[];
      let hasAtLeastOne = requiredPermissions.some(p => auth.hasPermissions(p));
      if (!hasAtLeastOne) {
        console.log('[authGuard] accès refusé, au moins une des permissions requises:', requiredPermissions);
        return router.createUrlTree(['/unauthorized']);
      }
    } 
    else 
    {
      const requiredPermission = route.data['permissions'] as string;
      if (requiredPermission && !auth.hasPermissions(requiredPermission)) {
        return router.createUrlTree(['/unauthorized']);
      }
    }
    return true;

  }else{

    router.navigate(['/login'])
    return false;
  }

};












/*
if (Array.isArray(route.data['permissions'])) {
  const requiredPermissions = route.data['permissions'] as string[];
  
  const hasAll = requiredPermissions.every(p => auth.hasPermissions(p));
  if (!hasAll) {
    console.log('[authGuard] accès refusé, permissions requises:', requiredPermissions);
    return router.createUrlTree(['/unauthorized']);
  }
} else {
  const requiredPermission = route.data['permissions'] as string;
  if (requiredPermission && !auth.hasPermissions(requiredPermission)) {
    return router.createUrlTree(['/unauthorized']);
  }
}
*/