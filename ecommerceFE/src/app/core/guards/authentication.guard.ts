import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly authenticationService: AuthenticationService, private readonly router: Router) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.authenticationService.hasValidToken().pipe(
      map(responseOk => {
        if (!responseOk) {
          return this.router.parseUrl('');
        }
        return responseOk;
      })
    );
  }

}
