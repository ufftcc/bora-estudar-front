import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCreateGroupComponent } from './study-create-group.component';

describe('StudyCreateGroupComponent', () => {
  let component: StudyCreateGroupComponent;
  let fixture: ComponentFixture<StudyCreateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyCreateGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
