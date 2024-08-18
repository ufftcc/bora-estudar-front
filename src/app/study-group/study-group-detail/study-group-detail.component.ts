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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  userInGroup!: boolean;
  isOwnerId!: boolean;
  loading: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public service: StudyGroupService,
    private route: ActivatedRoute,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.studyGroup = this.service.getStudyGroup();
    console.error('on init', this.studyGroup)
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
    // this.dialogRef.close();
  }

  joinGroup() {
    const idUsuario = localStorage.getItem('idUsuario');
    this.loading = true;

    if (idUsuario !== null) {
      const id = Number(idUsuario);
      this.service.joinGroupService(this.studyGroup.id, id).subscribe({
        next: (resposta) => {
          console.error(resposta);
          this.snackBar.open(
            'Entrou no grupo com sucesso!',
            'X',
            { duration: 2500 }
          );
          this.close();
          this.router.navigate(['/my-study-group']);
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
      this.service.leaveGroupService(this.studyGroup.id, id).subscribe({
        next: (resposta) => {
          this.close();
          this.snackBar.open(
            'Saiu do grupo com sucesso!',
            'X',
            { duration: 5000 }
          );
          this.router.navigate(['/search']);
          setTimeout(() => {
            this.router.navigate(['/my-study-group']);
          }, 10);
        },
        error: (error) => {
          console.error('Erro ao sair do grupo:', error);
          this.loading = false;
          this.snackBar.open(
            'Erro ao sair do grupo!',
            '',
            { duration: 5000 }
          );
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
