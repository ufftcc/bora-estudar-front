/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudyGroupSearchListComponent } from './study-group-search-list.component';

describe('StudyGroupSearchListComponent', () => {
  let component: StudyGroupSearchListComponent;
  let fixture: ComponentFixture<StudyGroupSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [StudyGroupSearchListComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyGroupSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
