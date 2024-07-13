import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatOption } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-study-group-filter-dialog',
    // standalone: true,
    // imports: [],
    templateUrl: './study-group-filter-dialog.component.html',
    styleUrl: './study-group-filter-dialog.component.css',
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
})
export class StudyGroupFilterDialogComponent {
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

  constructor(
    private dialogRef: MatDialogRef<StudyGroupFilterDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  applyFilters(): void {
    const filters = {
      days: this.selectedDays,
      modality: this.selectedModality,
    };
    this.dialogRef.close(filters);
  }
}
