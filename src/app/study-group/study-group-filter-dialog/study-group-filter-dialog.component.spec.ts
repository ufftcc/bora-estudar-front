import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupFilterDialogComponent } from './study-group-filter-dialog.component';

describe('StudyGroupFilterDialogComponent', () => {
  let component: StudyGroupFilterDialogComponent;
  let fixture: ComponentFixture<StudyGroupFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupFilterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyGroupFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
