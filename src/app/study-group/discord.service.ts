import { catchError, map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudyGroup } from './study-group';
import { UserResponseBasicDto } from 'src/app/shared/models/user/user-response-basic-dto';
import { environment } from 'src/environments/environment';

const AUTH_API = '/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DiscordService {
  private readonly http = inject(HttpClient);
  constructor() {}

  doAuthDiscord(
    code: string,
    userId: string
  ): Observable<UserResponseBasicDto> {
    return this.http.get<UserResponseBasicDto>(
      `${AUTH_API}/discord/users?code=${code}&state=${userId}`
    );
  }
}
