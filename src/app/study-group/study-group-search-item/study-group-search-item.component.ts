import { Component, Input } from '@angular/core';
import { StudyGroup } from '../study-group';

@Component({
  selector: 'app-study-group-search-item',
  templateUrl: './study-group-search-item.component.html',
  styleUrls: ['./study-group-search-item.component.css'],
})
export class StudyGroupSearchItemComponent {
  @Input() studyGroup!: StudyGroup;

  constructor() {}
}
