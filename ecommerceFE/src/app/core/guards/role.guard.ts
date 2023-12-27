import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationQuery } from '../authentication/authentication.query';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly authenticationQuery: AuthenticationQuery, private readonly router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const { requireRoles = [] } = route.data;
    return this.authenticationQuery.select(x => x.userProfile)
      .pipe(
        map(user => requireRoles.includes(user.role)),
        map(canActive => {
          if (!canActive) {
            return this.router.parseUrl('');
          }
          return true;
        })
      );
  }

}
