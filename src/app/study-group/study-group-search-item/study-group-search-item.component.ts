import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudyGroup } from '../study-group';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NgFor, TitleCasePipe } from '@angular/common';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { StudyGroupService } from '../study-group.service';

@Component({
    selector: 'app-study-group-search-item',
    templateUrl: './study-group-search-item.component.html',
    styleUrls: ['./study-group-search-item.component.scss'],
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

  constructor(
    public service: StudyGroupService,
    private router: Router) {}

  openDetalheDialog(studyGroup: any): void {
    this.service.setStudyGroup(studyGroup);
    this.router.navigate([`/detail`]);

    // let dialogRef = this.dialog.open(StudyGroupDetailComponent, {
    //   maxWidth: '100vw',
    //   maxHeight: '100vh',
    //   height: '100%',
    //   width: '100%',
    //   data: { id: id }
    // });
  }
}
