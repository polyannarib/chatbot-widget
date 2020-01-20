import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxPropertyComponent } from './box-property.component';

describe('BoxPropertyComponent', () => {
  let component: BoxPropertyComponent;
  let fixture: ComponentFixture<BoxPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
