import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatOption } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { StudyGroupService } from '../study-group.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-study-create-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    NgFor,
    MatOption,
    MatChipListbox,
    MatChipOption,
    MatInput,
    MatButton,
    MatAutocompleteModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './study-create-group.component.html',
  styleUrl: './study-create-group.component.scss',
  providers: [MessageService],
})

export class StudyCreateGroupComponent implements OnInit {
  formulario!: UntypedFormGroup;
  options: any[] = [];
  filteredOptions!: any[];
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  protected daysOfWeek: { id: number; name: string }[] = [
    { id: 1, name: 'Dom' },
    { id: 2, name: 'Seg' },
    { id: 3, name: 'Ter' },
    { id: 4, name: 'Qua' },
    { id: 5, name: 'Qui' },
    { id: 6, name: 'Sex' },
    { id: 7, name: 'Sáb' },
  ];

  protected modalities: { value: string; viewValue: string }[] = [
    { value: 'presencial', viewValue: 'Presencial' },
    { value: 'online', viewValue: 'Online' },
    { value: 'hibrido', viewValue: 'Híbrido' },
  ];

  protected selectedModality: String | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public service: StudyGroupService,
    private builder: UntypedFormBuilder
  ) {
    this.formulario = this.builder.group({
      title: [''],
      description: [''],
      campoOculto: [''],
      subject: [''],
      maxStudents: [''],
      meetingTime: [''],
      modality: ['REMOTE'],
      weekdays: [''],
    });
  }

  ngOnInit(): void {
    this.service.getSubjects().subscribe((dados) => {
      console.error('Dados carregados:', dados);
      this.service.subjects = dados;
      this.options = dados;
      this.filteredOptions = this.options.slice();
    });
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.service.subjects.filter(
      (option) =>
        option.id.toString().includes(filterValue) ||
        option.name.toLowerCase().includes(filterValue) ||
        option.code.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelected(option: any): void {
    this.formulario.get('subject')?.patchValue(option);
    this.formulario
      .get('campoOculto')
      ?.patchValue(option.code + ' - ' + option.name);
  }

  private subscription: Subscription | null = null;

  createGroups() {
    const idUsuario = localStorage.getItem('idUsuario');
    const id = Number(idUsuario);
    const title =
      this.formulario?.value.subject.code +
      ' ' +
      this.formulario?.value.subject.name;

    const studyGroupData = {
      title: title,
      description: this.formulario?.value.description,
      ownerId: id,
      subject: this.formulario?.value.subject,
      weekdays: this.formulario?.value.weekdays,
      meetingTime: this.formulario?.value.meetingTime,
      maxStudents: this.formulario?.value.maxStudents,
      modality: this.formulario?.value.modality,
    };

    this.subscription = this.service
      .createStudyGroup(studyGroupData)
      .subscribe({
        next: (response) => {
          console.error('Grupo de estudo criado com sucesso:', response);

          const mappedStudyGroup = this.service.mappingStudyGroup(response);
          this.service.setStudyGroup(mappedStudyGroup);

          this.snackBar.open('Grupo de estudo criado com sucesso!', 'X', {
            duration: 2500,
          });
          this.router.navigate([`/detail/${response.id}`]);
        },
        error: (error) => {
          console.error('Erro ao criar grupo de estudo:', error);
        },
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe(); // Cancela a assinatura ao destruir o componente
  }
}
