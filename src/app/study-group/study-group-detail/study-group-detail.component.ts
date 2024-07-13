import { Component, Input, OnInit, inject } from '@angular/core';
import { StudyGroup } from '../study-group';
import { StudyGroupMockService } from '../study-group-mock.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-study-group-detail',
  templateUrl: './study-group-detail.component.html',
  styleUrls: ['./study-group-detail.component.css'],
})
export class StudyGroupDetailComponent implements OnInit {
  studyGroupService = inject(StudyGroupMockService);
  studyGroup$ = new Observable<StudyGroup | undefined>(undefined);

  constructor(route: ActivatedRoute) {
    route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('groupId')!);
      this.studyGroup$ = this.studyGroupService.get(id).pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return of(undefined); // Retorna um observable vazio em caso de erro
        })
      );
    });
  }

  ngOnInit() {
    // this.studyGroupp = this.studyGroup$ as StudyGroup;
  }
}
