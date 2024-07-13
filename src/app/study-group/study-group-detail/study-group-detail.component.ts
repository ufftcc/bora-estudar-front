import { Component, Input, OnInit, inject } from '@angular/core';
import { StudyGroup } from '../study-group';
import { StudyGroupMockService } from '../study-group-mock.service';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { NgFor, AsyncPipe, TitleCasePipe } from '@angular/common';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-study-group-detail',
    templateUrl: './study-group-detail.component.html',
    styleUrls: ['./study-group-detail.component.css'],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatChipSet,
        NgFor,
        MatChip,
        MatCardActions,
        MatButton,
        RouterLink,
        AsyncPipe,
        TitleCasePipe,
    ],
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
