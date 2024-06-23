import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-study-group-filter-dialog',
  // standalone: true,
  // imports: [],
  templateUrl: './study-group-filter-dialog.component.html',
  styleUrl: './study-group-filter-dialog.component.css',
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
