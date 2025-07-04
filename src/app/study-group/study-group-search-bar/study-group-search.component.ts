import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudyGroupFilterDialogComponent } from '../study-group-filter-dialog/study-group-filter-dialog.component';
import { StudyGroupSearchListComponent } from '../study-group-search-list/study-group-search-list.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { StudyGroupService } from '../study-group.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { StudyGroupSearchItemComponent } from '../study-group-search-item/study-group-search-item.component';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/security/auth/auth.service';


@Component({
  selector: 'app-study-group-search-bar',
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
    MatAutocompleteModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class StudyGroupSearchBarComponent implements OnInit {
  options: any[] = [];
  filteredOptions!: any[];
  selectedDays: Set<string> = new Set();
  selectedHour: string = '';
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('time') time!: ElementRef<HTMLInputElement>;
  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

  constructor(
    private cdr: ChangeDetectorRef,
    public service: StudyGroupService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {

      const updated = params['updated'];
      const userIdString = localStorage.getItem('idUsuario');
      const userId = userIdString ? Number(userIdString) : null;
      if (updated && userId) {
        this.authService.refreshUserInfo(userId).subscribe((user) => {
          localStorage.setItem('signed-user', JSON.stringify(user));

          // limpa a query param da URL
          this.router.navigate([], {
            queryParams: {},
            queryParamsHandling: '',
            replaceUrl: true,
          });
        });
      }
    });

    this.service.getStudyGroups().subscribe((dados) => {
      this.service.studyGroups = dados;
      this.options = dados;
      this.filteredOptions = this.options.slice();
    });
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.service.studyGroups.filter(
      (option) =>
        option.title.toLowerCase().includes(filterValue) ||
        option.code.toLowerCase().includes(filterValue)
    );
  }

  applyFilters(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();

    // Dividir o valor do filtro em partes, se necessário
    const [codeFilter, titleFilter] = filterValue
      .split(' - ')
      .map((part) => part.trim());

    const filter =
      this.service.studyGroups?.filter(
        (option) =>
          this.filterByDayOfWeek(option) &&
          this.filterByHour(option) &&
          (option.code.toLowerCase().includes(codeFilter) ||
            option.title.toLowerCase().includes(titleFilter))
      ) || [];

    this.options = [...filter];
    this.cdr.detectChanges();
  }

  clearFilters(): void {
    this.input.nativeElement.value = '';
    this.time.nativeElement.value = '';
    this.selectedDays.clear();
    this.selectedHour = '';

    this.checkboxes.forEach((checkbox) => (checkbox.checked = false));
    this.cdr.detectChanges();

    this.service.getStudyGroups().subscribe((dados) => {
      this.service.studyGroups = dados;
      this.options = dados;
      this.filteredOptions = this.options.slice();
    });
  }

  filterByDayOfWeek(option: any): boolean {
    if (!option.daysOfWeek || this.selectedDays.size === 0) {
      return true; // Sem filtro de dia da semana ou dados não definidos
    }
    return option.daysOfWeek.some((day: string) =>
      this.selectedDays.has(day.toLowerCase())
    );
  }

  filterByHour(option: any): boolean {
    if (!this.selectedHour) {
      return true; // Sem filtro de horário
    }
    return option.hour >= this.selectedHour;
  }

  days(day: string): void {
    if (this.selectedDays.has(day)) {
      this.selectedDays.delete(day);
    } else {
      this.selectedDays.add(day);
    }
  }

  onHourChange(event: any): void {
    this.selectedHour = event.target.value;
  }

  navigateCreate(): void {
    this.router.navigate(['/create']);
  }
}
