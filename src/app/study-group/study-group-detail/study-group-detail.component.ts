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
import { interval, Subscription } from 'rxjs';
import { switchMap, takeWhile, delay } from 'rxjs/operators';


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
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
})
export class StudyGroupDetailComponent implements OnInit {
  studyGroup: any;
  diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  userInGroup!: boolean;
  isOwnerId!: boolean;
  loading: boolean = false;
  discordInviteUrl: string | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public service: StudyGroupService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.studyGroup = this.service.getStudyGroup(); // ainda útil se estiver em memória
    const nav = this.router.getCurrentNavigation();
    const state =
      (nav?.extras?.state as { fromCreate?: boolean }) || history.state;
    if (state?.fromCreate) {
      this.startPolling();
    } else {
      this.callGroup();
    }
  }

  private pollingSub!: Subscription;

  startPolling() {
    const idParam = this.route.snapshot.paramMap.get('groupId');
    const groupId = idParam ? Number(idParam) : null;

    if (groupId === null) {
      this.router.navigate(['/search']);
      return;
    }

    this.loading = true;

    this.pollingSub = interval(2000)
      .pipe(
        switchMap(() => this.service.getStudyGroupId(groupId)),
        takeWhile((response: any) => {
          const subject = response?.discordInviteUrl;
          const shouldKeepPolling =
            !subject || Object.keys(subject).length === 0;
          if (!shouldKeepPolling) {
            const mapped = this.service.mappingStudyGroup(response);
            this.studyGroup = mapped;
            this.discordInviteUrl = mapped.discordInviteUrl;
            this.evaluateUserState();
            this.loading = false;

            this.snackBar.open('Grupo de estudo criado com sucesso!', 'X', {
              duration: 3000,
            });
          }
          return shouldKeepPolling;
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Erro ao buscar grupo:', error);
          this.router.navigate(['/search']);
        },
      });
  }

  evaluateUserState() {
    const idUsuario = localStorage.getItem('idUsuario');
    const id = Number(idUsuario);

    if (this.studyGroup && Array.isArray(this.studyGroup.students)) {
      this.userInGroup = this.studyGroup.students.some(
        (student: any) => student.id === id
      );
      this.isOwnerId = this.studyGroup.ownerId === id;
    }
  }

  openDiscord() {
    if (this.discordInviteUrl) {
      window.open(this.discordInviteUrl, '_blank', 'noopener,noreferrer');
    } else {
      this.snackBar.open('Link do Discord não disponível', 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    }
  }

  joinGroup() {
    const idUsuario = localStorage.getItem('idUsuario');
    this.loading = true;

    if (idUsuario !== null) {
      const id = Number(idUsuario);
      this.service
        .joinGroupService(this.studyGroup.id, id)
        .pipe(
          delay(3500) // Atraso de 3,5 segundos
        )
        .subscribe({
          next: (response) => {
            this.snackBar.open('Entrou no grupo com sucesso!', 'X', {
              duration: 5000,
            });

            this.loading = false;

            this.callGroup();
          },
          error: (error) => {
            console.error('Erro ao entrar no grupo:', error);
            this.loading = false;
          },
        });
    } else {
      console.error('ID do usuário não encontrado no localStorage');
      this.loading = false;
    }
  }

  leaveGroup() {
    const idUsuario = localStorage.getItem('idUsuario');
    this.loading = true;

    if (idUsuario !== null) {
      const id = Number(idUsuario);
      this.service
        .leaveGroupService(this.studyGroup.id, id)
        .pipe(
          delay(3500) // Atraso de 5 segundos
        )
        .subscribe({
          next: (resposta) => {
            this.snackBar.open('Saiu do grupo com sucesso!', 'X', {
              duration: 5000,
            });
            this.loading = false;
            this.callGroup();
          },
          error: (error) => {
            console.error('Erro ao sair do grupo:', error);
            this.loading = false;
            this.snackBar.open('Erro ao sair do grupo!', '', {
              duration: 5000,
            });
          },
        });
    } else {
      console.error('ID do usuário não encontrado no localStorage');
      this.loading = false;
    }
  }

  editGroup() {
    if (this.studyGroup) {
      this.router.navigate(['/edit'], {
        queryParams: { id: this.studyGroup.id },
      });
    }
  }

  callGroup() {
    const idParam = this.route.snapshot.paramMap.get('groupId');
    const idDetail = idParam ? Number(idParam) : null;

    if (idDetail !== null) {
      this.service.getStudyGroupId(idDetail).subscribe({
        next: (response) => {
          //console.error('grupo de estudo - response:', response);
          const mappedStudyGroup = this.service.mappingStudyGroup(response);
          this.studyGroup = mappedStudyGroup;
          this.discordInviteUrl = this.studyGroup.discordInviteUrl; // Assumindo que o invite está nesta propriedade

          //console.error('grupo de estudo - detalhe:', mappedStudyGroup);

          const idUsuario = localStorage.getItem('idUsuario');
          const id = Number(idUsuario);

          if (this.studyGroup && Array.isArray(this.studyGroup.students)) {
            const isStudentInGroup = this.studyGroup.students.some(
              (student: any) => student.id === id
            );
            this.userInGroup = isStudentInGroup;

            const isOwner = this.studyGroup.ownerId === id;
            this.isOwnerId = isOwner;
          }
        },
        error: (error) => {
          this.router.navigate([`/search`]);
        },
      });
    }
  }
  ngOnDestroy() {
    this.pollingSub?.unsubscribe();
  }
}
