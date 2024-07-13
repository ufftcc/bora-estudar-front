import { Component, Input } from '@angular/core';
import { StudyGroup } from '../study-group';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NgFor, TitleCasePipe } from '@angular/common';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-study-group-search-item',
    templateUrl: './study-group-search-item.component.html',
    styleUrls: ['./study-group-search-item.component.css'],
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
        TitleCasePipe,
    ],
})
export class StudyGroupSearchItemComponent {
  @Input() studyGroup!: StudyGroup;

  constructor() {}
}
