import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { SignalRService } from '../signalR/signal-r.service';
import { Authentication, AuthenticationUser, JwtModel, RefreshToken } from './authentication.model';
import { AuthenticationQuery } from './authentication.query';
import { AuthenticationStore } from './authentication.store';

@Injectable()
export class AuthenticationService {
  private refreshTokenTimeout!: any;
  constructor(
    private authenticationStore: AuthenticationStore,
    private http: HttpClient,
    private authenticationQuery: AuthenticationQuery,
    private signalRService: SignalRService,
    private router: Router
  ) {
  }


  login(username: string, password: string) {
    return this.http.post<Authentication>('api/auth/login', {
      username,
      password
    }).pipe(tap((res) => {
      this.authenticationStore.update({ accessToken: res.accessToken });
      this.authenticationStore.update({ refreshToken: res.refreshToken });
    }));
  }

  logout(): void {
    this.disconnectSocket();
    this.stopTimerRefreshToken();
    this.authenticationStore.reset();
    this.router.navigate(['']);
  }

  refreshToken() {
    const { refreshToken } = this.authenticationStore.getValue();
    return this.http.post<RefreshToken>('api/auth/refresh-token', {
      refreshToken
    }).pipe(
      tap(
        res => {
          this.authenticationStore.update({ accessToken: res.accessToken });
        }
      ),
      catchError(() => EMPTY)
    );
  }

  getUserProfile() {
    return this.authenticationQuery.select(x => x.accessToken).pipe(
      filter(x => !!x),
      tap(
        accessToken => {
          this.startTimerRefreshToken(accessToken);
        }
      ),
      mergeMap(accessToken => {
        const header = new HttpHeaders({
          'authorization': `Bearer ${accessToken}`
        });
        return this.http.get<AuthenticationUser>('api/auth/user-profile', {
          headers: header
        }).pipe(catchError(() => {
          this.disconnectSocket();
          this.authenticationStore.reset();
          return EMPTY;
        }));
      }),
      tap(res => {
        this.connectSocket();
        this.authenticationStore.update({ userProfile: { ...res, isAuthenticate: true } });
      })
    );
  }

  private startTimerRefreshToken(accessToken: string): void {
    const jwt = this.parseJwt(accessToken);
    const exp = new Date(jwt.exp * 1000);
    const timeOut = exp.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeOut);
  }

  private stopTimerRefreshToken(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

  private disconnectSocket(): void {
    this.signalRService.disconnectConnection();
  }

  private connectSocket(): void {
    this.signalRService.startConnection();
  }

  private parseJwt(token: string): JwtModel {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload) as JwtModel;
  };

  hasValidToken() {
    const { accessToken } = this.authenticationQuery.getValue();
    if (!accessToken) {
      return of(false);
    }
    const header = new HttpHeaders({
      'authorization': `Bearer ${accessToken}`
    });
    return this.http.get<AuthenticationUser>('api/auth/user-profile', {
      headers: header
    }).pipe(
      map(_ => {
        return true;
      }),
      catchError(_ => of(false)));
  }
}
