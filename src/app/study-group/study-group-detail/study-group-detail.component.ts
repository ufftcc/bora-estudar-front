import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { StudyGroup } from '../study-group';
import { StudyGroupMockService } from '../study-group-mock.service';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgFor, AsyncPipe, TitleCasePipe, CommonModule } from '@angular/common';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { StudyGroupService } from '../study-group.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-study-group-detail',
    templateUrl: './study-group-detail.component.html',
    styleUrls: ['./study-group-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatToolbar,
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
        MatIcon,
        MatIconButton,
        MatSidenavContainer,
        MatSidenav,
        MatNavList,
        MatListItem,
    ],
})
export class StudyGroupDetailComponent implements OnInit {
  studyGroup: any;
  diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: any },
    private dialogRef: MatDialogRef<StudyGroupDetailComponent>) {
    this.studyGroup = data.id;
  }

  close(): void {
    this.dialogRef.close();
  }

  // studyGroupService = inject(StudyGroupService);
  // studyGroup$ = new Observable<StudyGroup | undefined>(undefined);

  // constructor(route: ActivatedRoute) {
  //   route.paramMap.subscribe((params: ParamMap) => {
  //     const id = Number(params.get('groupId')!);
  //     this.studyGroup$ = this.studyGroupService.get(id).pipe(
  //       catchError((error) => {
  //         console.error('Error occurred:', error);
  //         return of(undefined); // Retorna um observable vazio em caso de erro
  //       })
  //     );
  //   });
  // }

  ngOnInit() {
    // this.studyGroupp = this.studyGroup$ as StudyGroup;
  }
}
