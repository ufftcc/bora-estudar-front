import { Component, OnInit, inject } from '@angular/core';
import { StudyGroup } from '../study-group';
import { StudyGroupMockService } from '../study-group-mock.service';
import { StudyGroupService } from '../study-group.service';
import { catchError, Observable, of } from 'rxjs';
import { StudyGroupSearchItemComponent } from '../study-group-search-item/study-group-search-item.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-study-group-search-list',
    templateUrl: './study-group-search-list.component.html',
    styleUrls: ['./study-group-search-list.component.css'],
    standalone: true,
    imports: [NgFor, StudyGroupSearchItemComponent],
})
export class StudyGroupSearchListComponent implements OnInit {
  studyGroupService = inject(StudyGroupMockService);
  studyGroupServiceReal = inject(StudyGroupService);
  studyGroups$: StudyGroup[] = [];
  studyGroupsReal$: Observable<any> = new Observable();

  constructor() {
    this.studyGroups$ = this.studyGroupService.getStudyGroups();
    this.studyGroupServiceReal.getStudyGroups().subscribe({
      next: (data) => {
        this.studyGroupsReal$ = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {}
}
