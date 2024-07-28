import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatOption } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-study-create-group',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './study-create-group.component.html',
  styleUrl: './study-create-group.component.scss'
})
export class StudyCreateGroupComponent {
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

  protected selectedDays: Number[] = [];
  protected selectedModality: String | null = null;

  constructor() {}

}
