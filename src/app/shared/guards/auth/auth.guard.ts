import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map, take, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => user ? true : router.parseUrl('/login'))
  );
};

export const publicGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => !user ? true : router.parseUrl('/home'))
  );
};

export const adminGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    switchMap(user => {
      if (!user) return of(router.parseUrl('/login'));
      
      return authService.currentUser.pipe(
        take(1),
        map(currentUser => 
          currentUser?.email === 'admin@admin.com' 
            ? true 
            : router.parseUrl('/home')
        )
      );
    })
  );
};
