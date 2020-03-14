import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceFindComponent } from './resource-find.component';

describe('ResourceFindComponent', () => {
  let component: ResourceFindComponent;
  let fixture: ComponentFixture<ResourceFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
