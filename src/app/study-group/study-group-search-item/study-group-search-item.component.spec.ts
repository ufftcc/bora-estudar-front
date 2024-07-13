/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudyGroupSearchItemComponent } from './study-group-search-item.component';

describe('StudyGroupSearchItemComponent', () => {
  let component: StudyGroupSearchItemComponent;
  let fixture: ComponentFixture<StudyGroupSearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [StudyGroupSearchItemComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyGroupSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
