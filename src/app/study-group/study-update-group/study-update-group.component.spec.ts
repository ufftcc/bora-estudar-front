import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyUpdateGroupComponent } from './study-update-group.component';

describe('StudyUpdateGroupComponent', () => {
  let component: StudyUpdateGroupComponent;
  let fixture: ComponentFixture<StudyUpdateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyUpdateGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyUpdateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
