import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictInitializeComponent } from './conflict-initialize.component';

describe('ConflictInitializeComponent', () => {
  let component: ConflictInitializeComponent;
  let fixture: ComponentFixture<ConflictInitializeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConflictInitializeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictInitializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
