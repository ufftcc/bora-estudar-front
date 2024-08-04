import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudyGroupComponent } from './my-study-group.component';

describe('MyStudyGroupComponent', () => {
  let component: MyStudyGroupComponent;
  let fixture: ComponentFixture<MyStudyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyStudyGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyStudyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
