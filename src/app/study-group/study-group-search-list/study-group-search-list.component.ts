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
    styleUrls: ['./study-group-search-list.component.scss'],
    standalone: true,
    imports: [NgFor, StudyGroupSearchItemComponent],
})
export class StudyGroupSearchListComponent implements OnInit {
  studyGroups: StudyGroup[] = [];

  constructor(
    public service: StudyGroupService) {}

  ngOnInit() {
    this.service.getStudyGroups().subscribe((dados) => {
      console.error(dados)
      this.studyGroups = dados;
    })
  }
}
