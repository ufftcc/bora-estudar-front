import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupSearchComponent } from './study-group-search.component';

describe('StudyGroupSearchComponent', () => {
  let component: StudyGroupSearchComponent;
  let fixture: ComponentFixture<StudyGroupSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyGroupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
