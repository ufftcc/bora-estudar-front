import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { StudyGroupService } from '../study-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-study-update-group',
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
    ProgressSpinnerModule
  ],
  templateUrl: './study-update-group.component.html',
  styleUrl: './study-update-group.component.scss',
  providers: [MessageService]
})
export class StudyUpdateGroupComponent implements OnInit {
  formulario!: UntypedFormGroup;
  options: any[] = [];
  filteredOptions!: any[];
  loading: boolean = false;
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
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public service: StudyGroupService,
    private builder: UntypedFormBuilder) {
    this.formulario = this.builder.group({
      id: [''],
      title: [''],
      description: [''],
      campoOculto: [''],
      subject: [''],
      maxStudents: [''],
      meetingTime: [''],
      modality: ["REMOTE"],
      weekdays: [[]]
    })
  }

  ngOnInit(): void {
    this.service.getSubjects().subscribe((dados) => {
      this.service.subjects = dados;
      this.options = dados;
      this.filteredOptions = this.options.slice();
    })

    this.route.queryParams.subscribe(params => {
      const groupId = params['id'];

      this.service.getStudyGroupId(groupId).subscribe((dados: any) => {
        this.formulario.patchValue(dados)
        this.formulario.get('campoOculto')?.patchValue(dados.subject.code + ' - ' + dados.subject.name);

        const selectedDays = dados.weekdays.map((day: { id: number; name: string }) => {
          return this.daysOfWeek.find(d => d.id === day.id);
        });
        this.formulario.get('weekdays')?.patchValue(selectedDays);
      })
    });
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.service.subjects.filter(option =>
      option.id.toString().includes(filterValue) || option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelected(option: any): void {
    this.formulario.get('subject')?.patchValue(option);
    this.formulario.get('campoOculto')?.patchValue(option.code + ' - ' + option.name);
  }

  editGroups(){
    const idUsuario = localStorage.getItem('idUsuario');
    const id = Number(idUsuario);
    const title = this.formulario?.value.subject.code + " " + this.formulario?.value.subject.name;

    const groupId = this.formulario?.value.id;

    const studyGroupData = {
      id: this.formulario?.value.id,
      title: title,
      description: this.formulario?.value.description,
      userId: id,
      ownerId: id,
      subject: this.formulario?.value.subject,
      weekdays: this.formulario?.value.weekdays,
      meetingTime: this.formulario?.value.meetingTime,
      maxStudents: this.formulario?.value.maxStudents,
      modality: this.formulario?.value.modality
    };

    this.loading = true;

    this.service.editStudyGroup(studyGroupData, groupId).subscribe(
      response => {
        console.log('Grupo de estudo editado com sucesso:', response);

        this.snackBar.open(
          'Grupo de estudo editado com sucesso!',
          '',
          { duration: 5000 }
        );
        this.router.navigate(['/my-study-group']);
      },
      error => {
        this.loading = false;
        console.error('Erro ao criar grupo de estudo:', error);
      }
    );
  }

}
