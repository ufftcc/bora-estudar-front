import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudyGroupFilterDialogComponent } from '../study-group-filter-dialog/study-group-filter-dialog.component';

@Component({
  selector: 'app-study-group-search',
  // standalone: true,
  // imports: [],
  templateUrl: './study-group-search.component.html',
  styleUrl: './study-group-search.component.css',
})
export class StudyGroupSearchComponent {
  constructor(private dialog: MatDialog) {}

  openFilterDialog(): void {
    let dialogRef = this.dialog.open(StudyGroupFilterDialogComponent, {
      // width: '100%',
      // height: '100%',
      // panelClass: 'full-screen-dialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((selectedDays: any) => {
      if (selectedDays) {
        // this.addToFilterToSendToBackEnd(selectedDays);
        console.log(selectedDays);
      }
    });
  }
}
