import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('--- AuthGuard: Verificando acceso ---');
  const token = authService.getToken();
  console.log('Token encontrado en localStorage:', token);
  const isLoggedIn = authService.isLoggedIn();
  console.log('authService.isLoggedIn() devuelve:', isLoggedIn);

  if (isLoggedIn) {
    console.log('✅ AuthGuard: Acceso PERMITIDO a', state.url);
    return true; 
  }

  console.log('❌ AuthGuard: Acceso DENEGADO. Redirigiendo a /login...');
  router.navigate(['/login']);
  return false;
};