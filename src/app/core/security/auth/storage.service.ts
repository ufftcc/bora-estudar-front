import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponseBasicDto } from 'src/app/shared/models/user/user-response-basic-dto';
import { of } from 'rxjs';

const SIGNED_USER = 'signed-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private signedUser = new BehaviorSubject<UserResponseBasicDto | undefined>(
    undefined
  );
  private hasSignedUser = new BehaviorSubject<boolean>(false);

  constructor() {
    this.restoreLocalStorage();
  }

  clear(): void {
    localStorage.clear();
    this.signedUser.next(undefined);
    this.hasSignedUser.next(false);
  }

  public saveUser(user: UserResponseBasicDto): void {
    localStorage.removeItem(SIGNED_USER);
    localStorage.setItem(SIGNED_USER, JSON.stringify(user));
    this.signedUser.next(user);
    this.hasSignedUser.next(true);
  }

  public getUser(): Observable<UserResponseBasicDto> {
    const signedUserString = localStorage.getItem(SIGNED_USER);
    if (!signedUserString) {
      throw new Error(`No signed user found in the session storage.`);
    }

    const signedUser: UserResponseBasicDto = JSON.parse(signedUserString);
    return of(signedUser);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.hasSignedUser.asObservable();
  }

  private restoreLocalStorage(): void {
    if (!localStorage.getItem(SIGNED_USER)) {
      return;
    }

    const signedUserStr = localStorage.getItem(SIGNED_USER)!;
    const signedUserObj = JSON.parse(signedUserStr);

    this.signedUser.next(signedUserObj);
    this.hasSignedUser.next(true);
  }
}
