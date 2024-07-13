/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudyGroupDetailComponent } from './study-group-detail.component';

describe('StudyGroupDetailComponent', () => {
  let component: StudyGroupDetailComponent;
  let fixture: ComponentFixture<StudyGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [StudyGroupDetailComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
