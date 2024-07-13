import { Observable, of } from 'rxjs';
import { StudyGroup } from './study-group';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudyGroupMockService {
  studyGroups: StudyGroup[] = [
    {
      id: 1,
      title: 'ALGORITMOS EM GRAFOS',
      shortDescription:
        'Não estou conseguindo entender o problema do caminho mínimo.',
      modality: 'online',
      hour: '19:00',
      monitor: '0/1',
      participants: '4/5',
      daysOfWeek: ['seg', 'qua', 'sex'],
    },
    {
      id: 2,
      title: 'ANÁLISE E PROJETO DE ALGORITMOS',
      shortDescription:
        'Preciso de ajuda com a análise de complexidade de algoritmos.',
      modality: 'Presencial',
      hour: '16:00',
      monitor: '0/1',
      participants: '0/3',
      daysOfWeek: ['seg', 'qua', 'sex'],
    },
    {
      id: 3,
      title: 'BANCO DE DADOS I',
      shortDescription: 'Preciso de ajuda com a modelagem do banco de dados.',
      modality: 'online',
      hour: '23:00',
      monitor: '0/1',
      participants: '1/2',
      daysOfWeek: ['ter', 'qui'],
    },
  ];

  constructor() {}

  getStudyGroups(): StudyGroup[] {
    return this.studyGroups;
  }

  get(id: number): Observable<StudyGroup> {
    return of(this.studyGroups.find((studyGroup) => studyGroup.id === id)!);
  }
}
