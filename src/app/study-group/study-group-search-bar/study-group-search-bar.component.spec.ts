import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupSearchBarComponent } from './study-group-search.component';

describe('StudyGroupSearchComponent', () => {
  let component: StudyGroupSearchBarComponent;
  let fixture: ComponentFixture<StudyGroupSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyGroupSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
