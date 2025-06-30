import { catchError, map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudyGroup } from './study-group';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.authApi;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StudyGroupService {
  private studyGroupParam: any;
  studyGroups: StudyGroup[] = [];
  myStudyGroups: StudyGroup[] = [];
  subjects: any[] = [];

  private readonly http = inject(HttpClient);
  constructor() {}

  getStudyGroups(): Observable<any[]> {
    return this.http
      .post<any[]>(`${AUTH_API}/study-groups/filter`, {}, httpOptions)
      .pipe(
        map((studyGroups) => studyGroups.map(this.mappingStudyGroup)),
        catchError((error) => {
          console.error('Erro na chamada de API', error);
          return of([]);
        })
      );
  }

  getStudyGroupsFind(studentId: number): Observable<any[]> {
    const requestBody = { studentId };

    return this.http.post<any[]>(`${AUTH_API}/study-groups/filter`, requestBody, httpOptions)
    .pipe(
      map((studyGroups) => studyGroups.map(this.mappingStudyGroup)),
      catchError((error) => {
        console.error('Erro na chamada de API', error);
        return of([]);
      })
    );;
  }

  public mappingStudyGroup(item: any): any {
    const {
      id,
      description,
      tutor,
      subject,
      students,
      maxStudents,
      meetingTime,
      modality,
      weekdays,
      ownerId,
      discordInviteUrl
    } = item;

    // const shortDescription =
    //   description.length > 50 ? description.substr(0, 100) + '...' : description;

    let countTutor = 0;
    if (tutor) {
      countTutor = 1;
    }
    const monitorText = `${countTutor}/${1}`;

    const participantsCount = students.length;
    const participantsText = `${participantsCount}/${maxStudents}`;
    const mappedHour = meetingTime.substr(0, 5);

    let mappedModality = '';
    switch (modality) {
      case 'REMOTE':
        mappedModality = 'remoto';
        break;
      case 'PRESENCIAL':
        mappedModality = 'presencial';
        break;
      default:
        mappedModality = 'híbrido';
    }

    return {
      id: id,
      title: subject.name,
      code: subject.code,
      ownerId: ownerId,
      shortDescription: description,
      modality: mappedModality,
      hour: mappedHour,
      monitor: monitorText,
      participants: participantsText,
      students: students,
      daysOfWeek: weekdays.map((day: { name: string }) =>
        day.name.toLowerCase().substring(0, 3)
      ),
      discordInviteUrl: discordInviteUrl
    };
  }

  joinGroupService(groupId: number,id: number){
    return this.http.post<any[]>(`${AUTH_API}/study-groups/${groupId}/students/${id}/join`, {}, httpOptions)
  }

  leaveGroupService(groupId: number,id: number){
    return this.http.post<any[]>(`${AUTH_API}/study-groups/${groupId}/students/${id}/leave`, {}, httpOptions)
  }

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${AUTH_API}/subjects`);
  }

  getStudyGroupId(studyGroupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${AUTH_API}/study-groups/${studyGroupId}`);
  }

  createStudyGroup(studyGroupData: any): Observable<any> {
    return this.http.post<any>(`${AUTH_API}/study-groups`, studyGroupData);
  }

  editStudyGroup(studyGroupData: any, groupId: number): Observable<any> {
    return this.http.put<any>(`${AUTH_API}/study-groups/${groupId}`, studyGroupData);
  }

  setStudyGroup(data: any) {
    this.studyGroupParam = data;
  }

  getStudyGroup() {
    return this.studyGroupParam;
  }
}
