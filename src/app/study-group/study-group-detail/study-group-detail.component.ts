import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { StudyGroup } from '../study-group';
import { StudyGroupMockService } from '../study-group-mock.service';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
        ToastModule,
        ProgressSpinnerModule
    ],
    providers: [MessageService]
})
export class StudyGroupDetailComponent implements OnInit {
  studyGroup: any;
  diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  groupId!: number;
  userInGroup!: boolean;
  isOwnerId!: boolean;
  loading: boolean = false;

  constructor(
    private router: Router,
    public service: StudyGroupService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: { id: any },
    private dialogRef: MatDialogRef<StudyGroupDetailComponent>) {
    this.studyGroup = data.id;
    this.groupId = data.id.id;
  }

  ngOnInit() {
    const idUsuario = localStorage.getItem('idUsuario');
    const id = Number(idUsuario);

    if (this.studyGroup && Array.isArray(this.studyGroup.students)) {
      const isStudentInGroup = this.studyGroup.students.some((student: any) => student.id === id);
      this.userInGroup = isStudentInGroup;

      const isOwner = this.studyGroup.ownerId === id;
      this.isOwnerId = isOwner;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  joinGroup() {
    const idUsuario = localStorage.getItem('idUsuario');
    this.loading = true;

    if (idUsuario !== null) {
      const id = Number(idUsuario);
      this.service.joinGroupService(this.groupId, id).subscribe({
        next: (resposta) => {
          console.error(resposta);
          this.messageService.add({ severity: 'success', summary: '', detail: 'Entrou no grupo com sucesso!'});

          setTimeout(() => {
            this.loading = false;
            this.close();
            this.router.navigate(['/my-study-group']);
          }, 3000);
        },
        error: (error) => {
          this.loading = false;
          console.error('Erro ao entrar no grupo:', error);
        }
      });
    } else {
      console.error('ID do usuário não encontrado no localStorage');
    }
  }

  leaveGroup() {
    const idUsuario = localStorage.getItem('idUsuario');
    this.loading = true;

    if (idUsuario !== null) {
      const id = Number(idUsuario);
      this.service.leaveGroupService(this.groupId, id).subscribe({
        next: (resposta) => {
          console.error(resposta);
          this.messageService.add({ severity: 'success', summary: '', detail: 'Saiu do grupo com sucesso!'});

          setTimeout(() => {
            this.close();
            this.loading = false;
            this.router.navigate(['/search']);
            setTimeout(() => {
              this.router.navigate(['/my-study-group']);
            }, 10);
          }, 3000);
        },
        error: (error) => {
          console.error('Erro ao entrar no grupo:', error);
        }
      });
    } else {
      console.error('ID do usuário não encontrado no localStorage');
    }
  }

  editGroup(){
    this.close();

    if (this.studyGroup) {
      this.router.navigate(['/edit'], { queryParams: { id: this.studyGroup.id } });
    }
  }
}
