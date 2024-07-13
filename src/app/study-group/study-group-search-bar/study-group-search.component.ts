import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudyGroupFilterDialogComponent } from '../study-group-filter-dialog/study-group-filter-dialog.component';

@Component({
  selector: 'app-study-group-search-bar',
  // standalone: true,
  // imports: [],
  templateUrl: './study-group-search-bar.component.html',
  styleUrl: './study-group-search-bar.component.css',
})
export class StudyGroupSearchBarComponent implements OnInit {
  private dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {}

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
