import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { StudyGroupService } from '../study-group.service';
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
    MatAutocompleteModule
  ],
  templateUrl: './my-study-group.component.html',
  styleUrl: './my-study-group.component.scss'
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

  ngOnInit() {
    const idUsuario = localStorage.getItem('idUsuario');
    const id = Number(idUsuario);

    this.service.getStudyGroupsFind(id).subscribe((dados) => {
      console.log('Dados carregados:', dados);
      this.service.myStudyGroups = dados;
      this.options = dados;
      this.filteredOptions = this.options.slice();
    })
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.service.myStudyGroups.filter(option =>
      option.title.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue)
    );
  }

  applyFilters(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();

    // Dividir o valor do filtro em partes, se necessário
    const [codeFilter, titleFilter] = filterValue.split(' - ').map(part => part.trim());

    const filter = this.service.myStudyGroups?.filter(option =>
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
    this.checkboxes.forEach(checkbox => checkbox.checked = false);
    this.cdr.detectChanges();
  }

  filterByDayOfWeek(option: any): boolean {
    if (!option.daysOfWeek || this.selectedDays.size === 0) {
      return true; // Sem filtro de dia da semana ou dados não definidos
    }
    return option.daysOfWeek.some((day: string) => this.selectedDays.has(day.toLowerCase()));
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
}
