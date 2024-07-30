import { Component, OnInit, inject } from '@angular/core';
import { StudyGroup } from '../study-group';
import { StudyGroupService } from '../study-group.service';
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

  constructor(public service: StudyGroupService) {}

  ngOnInit() {
    this.getStudyGroups();
  }

  getStudyGroups(): void {
    this.service
      .getStudyGroups()
      .subscribe((studyGroups) => (this.studyGroups = studyGroups));
  }
}
