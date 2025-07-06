import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudyGroupFilterDialogComponent } from '../study-group-filter-dialog/study-group-filter-dialog.component';
import { StudyGroupSearchListComponent } from '../study-group-search-list/study-group-search-list.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { StudyGroupFilterDto, StudyGroupService } from '../study-group.service';
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
    this.loadFilteredGroups(); // carrega todos sem filtro
  }

  loadFilteredGroups(): void {
    const dto: StudyGroupFilterDto = {};
    console.log('filterDto', dto);
    this.service.filterStudyGroups(dto).subscribe((dados) => {
      this.service.myStudyGroups = dados;
      this.options = dados;
      this.filteredOptions = this.getDistinctOptions(dados);
      this.cdr.detectChanges();
    });
  }

  getDistinctOptions(data: any[]): any[] {
    const map = new Map();
    for (let item of data) {
      const key = item.code + item.title;
      if (!map.has(key)) {
        map.set(key, item);
      }
    }
    return Array.from(map.values());
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = Array.from(
      new Map(
        this.options
          .filter(
            (option) =>
              option.title.toLowerCase().includes(filterValue) ||
              option.code.toLowerCase().includes(filterValue)
          )
          .map((option) => [option.code, option]) // remover duplicatas pelo código
      ).values()
    );
  }

  applyFilters(): void {
    let filterValue = this.input.nativeElement.value;
    let codeFilter: string | undefined;
    let titleFilter: string | undefined;

    [codeFilter, titleFilter] = filterValue
      .split(' - ')
      .map((part) => part.trim());

    // Verifica se o valor digitado existe em `options`
    const matchExists = this.options.some(
      (option) =>
        option.code.includes(codeFilter) && option.title.includes(titleFilter)
    );
    // Se não existir, limpa o campo e usa `undefined`
    if (!matchExists) {
      this.input.nativeElement.value = '';
      codeFilter = titleFilter = undefined;
    }

    console.log('titleFilter');
    console.log(titleFilter);

    const selectedWeekdays = Array.from(this.selectedDays)
      .map((day) => this.convertDayToNumber(day))
      .filter((n) => n >= 0);

    console.log('selectedWeekdays');
    console.log(selectedWeekdays);

    const filterDto: StudyGroupFilterDto = {
      subjectName: titleFilter || undefined,
      meetingTime: this.selectedHour || undefined,
      weekdays: selectedWeekdays.length ? selectedWeekdays : undefined,
    };

    this.service.filterStudyGroups(filterDto).subscribe((response) => {
      console.log('filterDto', filterDto);
      this.service.myStudyGroups = response;
      this.options = [...response];
      this.filteredOptions = this.getDistinctOptions([...response]);
      this.cdr.detectChanges();
    });
  }

  convertDayToNumber(day: string): number {
    const daysMap: { [key: string]: number } = {
      dom: 1,
      seg: 2,
      ter: 3,
      qua: 4,
      qui: 5,
      sex: 6,
      sab: 7,
    };
    return daysMap[day.toLowerCase()] ?? -1;
  }

  clearFilters(): void {
    this.input.nativeElement.value = '';
    this.time.nativeElement.value = '';
    this.selectedDays.clear();
    this.selectedHour = '';
    this.checkboxes.forEach((checkbox) => (checkbox.checked = false));

    this.loadFilteredGroups(); // recarrega tudo sem filtros
  }

  days(day: string): void {
    this.selectedDays.has(day)
      ? this.selectedDays.delete(day)
      : this.selectedDays.add(day);
  }

  onHourChange(event: any): void {
    this.selectedHour = event.target.value;
  }

  navigateCreate(): void {
    this.router.navigate(['/create']);
  }
}
