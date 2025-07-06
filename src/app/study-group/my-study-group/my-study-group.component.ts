import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { StudyGroupService, StudyGroupFilterDto } from '../study-group.service';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { StudyGroupSearchItemComponent } from '../study-group-search-item/study-group-search-item.component';
import { StudyGroupSearchListComponent } from '../study-group-search-list/study-group-search-list.component';

@Component({
  selector: 'app-my-study-group',
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
  ],
  templateUrl: './my-study-group.component.html',
  styleUrl: './my-study-group.component.scss',
})
export class MyStudyGroupComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFilteredGroups(); // carrega todos sem filtro
  }

  loadFilteredGroups(): void {
    const dto: StudyGroupFilterDto = {
      studentId: Number(localStorage.getItem('idUsuario')),
    };
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
      studentId: Number(localStorage.getItem('idUsuario')),
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
}
