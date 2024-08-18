import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupAssociateComponent } from './study-group-associate.component';

describe('StudyGroupAssociateComponent', () => {
  let component: StudyGroupAssociateComponent;
  let fixture: ComponentFixture<StudyGroupAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupAssociateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyGroupAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
