import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { SigninBody } from 'src/app/auth/models/signin-body';
import { SignupBody } from 'src/app/auth/models/signup-body';
import { UserResponseBasicDto } from 'src/app/shared/models/user/user-response-basic-dto';
import { StorageService } from './storage.service';

const AUTH_API = '';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);

  login(body: SigninBody): Observable<UserResponseBasicDto> {
    return this.http
      .post<UserResponseBasicDto>(AUTH_API.concat('/signin'), body, httpOptions)
      .pipe(
        tap((user) => {
          this.storageService.saveUser(user);
        }),
        catchError((error) => {
          console.log(`Error on login: ${error.message}`);
          this.storageService.clear();
          throw error;
        })
      );
  }

  register(body: SignupBody): Observable<UserResponseBasicDto> {
    return this.http
      .post<UserResponseBasicDto>(AUTH_API.concat('/signup'), body, httpOptions)
      .pipe(
        catchError((error) => {
          console.log(`Error on login: ${error.message}`);
          this.storageService.clear();
          throw error;
        })
      );
  }

  confirmEmail(token: string): Observable<any> {
    return this.http.get(
      AUTH_API.concat(`/confirm?token=${token}`),
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions).pipe(
      tap(() => {
        this.storageService.clear();
      }),
      catchError((error) => {
        console.log(`Error on login: ${error.message}`);
        this.storageService.clear();
        throw error;
      })
    );
  }

  getUser(): Observable<UserResponseBasicDto> {
    return this.storageService.getUser();
  }

  isLoggedIn(): Observable<boolean> {
    return this.storageService.isLoggedIn();
  }
}
