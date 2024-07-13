/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudyGroupMockService } from './study-group-mock.service';

describe('Service: StudyGroupMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyGroupMockService]
    });
  });

  it('should ...', inject([StudyGroupMockService], (service: StudyGroupMockService) => {
    expect(service).toBeTruthy();
  }));
});
