import { TestBed } from '@angular/core/testing';

import { MessagesFlowService } from './messages-flow.service';

describe('MessagesFlowService', () => {
  let service: MessagesFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
