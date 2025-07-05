import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

/**
 * A guard that prevents access to a route if the user is already logged in.
 * If the user is logged in, it redirects to the '/search' route.
 * If the user is not logged in, it allows access to the route.
 * @param _route - The activated route snapshot.
 * @param _state - The router state snapshot.
 * @returns A boolean or UrlTree indicating whether to allow or deny access to the route.
 */
export const loggedInGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree => {
  console.log('The loggedInGuard is being called correctly');
  const authService = inject(AuthService);
  const router = inject(Router);
  let isLoggedIn = false;

  authService.isLoggedIn().subscribe((b) => {
    isLoggedIn = b;
  });

  if (isLoggedIn) {
    router.navigateByUrl('/search');
    return false;
  }
  return true;
};

/**
 * A guard that checks if the user is authenticated before allowing access to a route.
 * If the user is not authenticated, it redirects to the login page.
 *
 * @param _route - The activated route snapshot.
 * @param _state - The router state snapshot.
 * @returns A boolean indicating whether the user is authenticated or not, or a UrlTree to redirect to the login page.
 */
export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree => {
  console.log('The authGuard is being called correctly');
  const authService = inject(AuthService);
  const router = inject(Router);
  let isLoggedIn = false;

  authService.isLoggedIn().subscribe((b) => {
    isLoggedIn = b;
  });

  console.log(isLoggedIn);

  if (!isLoggedIn) {
    router.navigateByUrl('/login');
    return false;
  }

  const url = _state.url;

  if (url.startsWith('/associate')) {
    const signed = localStorage.getItem('signed-user');

    console.log(`signed:${signed}`);
    if (signed) {

        const signedUser = JSON.parse(signed);

        if (signedUser?.isDiscordAssociate) {
          router.navigateByUrl('/search');
          return false;
        }

        return true;
    }
  }

  return true;
};

/**
 * A guard that prevents access to a route if the user is already logged in.
 * If the user is logged in, it redirects to the '/search' route.
 * If the user is not logged in, it allows access to the route.
 * @param _route - The activated route snapshot.
 * @param _state - The router state snapshot.
 * @returns A boolean or UrlTree indicating whether to allow or deny access to the route.
 */

export const discordAssociateGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const signed = localStorage.getItem('signed-user');

  if (!signed) {
    console.warn('Usuário não encontrado no localStorage');
    return router.createUrlTree(['/login']);
  }

  console.log(`signed:${signed}`);
  try {

    const url = _state.url;

    if (url.includes('updated=true')) {
      return true; // exceção temporária para permitir atualização
    }

    const signedUser = JSON.parse(signed);
    if (!signedUser?.isDiscordAssociate) {
      //console.log(`signedUser:${signedUser}`);
      return router.createUrlTree(['/associate']);
    }
    return true;

  } catch (e) {
    console.error('Erro ao fazer parse do signed-user:', e);
    return router.createUrlTree(['/associate']);
  }

};
