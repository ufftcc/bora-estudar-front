import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupAssociateCallbackComponent } from './study-group-associate-callback.component';

describe('StudyGroupAssociateCallbackComponent', () => {
  let component: StudyGroupAssociateCallbackComponent;
  let fixture: ComponentFixture<StudyGroupAssociateCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupAssociateCallbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyGroupAssociateCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
