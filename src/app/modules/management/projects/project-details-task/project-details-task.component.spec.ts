import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsTaskComponent } from './project-details-task.component';

describe('ProjectDetailsTaskComponent', () => {
  let component: ProjectDetailsTaskComponent;
  let fixture: ComponentFixture<ProjectDetailsTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
