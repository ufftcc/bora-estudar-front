import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudyGroupFilterDialogComponent } from '../study-group-filter-dialog/study-group-filter-dialog.component';
import { StudyGroupSearchListComponent } from '../study-group-search-list/study-group-search-list.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { StudyGroupService } from '../study-group.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudyGroupSearchItemComponent } from '../study-group-search-item/study-group-search-item.component';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
    selector: 'app-study-group-search-bar',
    // standalone: true,
    // imports: [],
    templateUrl: './study-group-search-bar.component.html',
    styleUrl: './study-group-search-bar.component.scss',
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        MatIcon,
        MatMenuModule,
        MatCheckboxModule,
        StudyGroupSearchListComponent,
        NgFor,
        StudyGroupSearchItemComponent,
        MatAutocompleteModule
    ],
})
export class StudyGroupSearchBarComponent implements OnInit {
  private dialog = inject(MatDialog);
  options: any[] = [];
  filteredOptions!: any[];
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor(
    public service: StudyGroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getStudyGroups().subscribe((dados) => {
      console.log(dados)
      this.service.studyGroups = dados;
      this.options = dados;
      this.filteredOptions = this.options.slice();
    })
  }

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

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(option =>
      option.title.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue)
    );
  }

  navigateCreate(): void {
    this.router.navigate(['/create']);
  }
}
