import { catchError, map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API = '/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StudyGroupService {
  // study-groups/filter
  private readonly http = inject(HttpClient);
  constructor() {}

  getStudyGroups(): Observable<any> {
    return this.http
      .post(`${AUTH_API}/study-groups/filter`, {}, httpOptions)
      .pipe(
        map((response: any) => {
          return response.map(this.mappingStudyGroup).filter((item: undefined) => item !== undefined);
        }),
        catchError(error => {
          console.error('Erro na chamada de API', error);
          return of([]);
        })
      );
  }

  private mappingStudyGroup(item: any): any {
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
        return;
      case 'PRESENCIAL':
        mappedModality = 'presencial';
        return;
      default:
        mappedModality = 'híbrido';
    }

    return {
      id: id,
      title: subject.name,
      shortDescription: description,
      modality: mappedModality,
      hour: mappedHour,
      monitor: monitorText,
      participants: participantsText,
      daysOfWeek: weekdays.map((day: { name: string }) =>
        day.name.toLowerCase().substring(0, 3)
      ),
    };
  }
}
