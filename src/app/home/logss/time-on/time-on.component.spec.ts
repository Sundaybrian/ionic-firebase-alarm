import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOnComponent } from './time-on.component';

describe('TimeOnComponent', () => {
  let component: TimeOnComponent;
  let fixture: ComponentFixture<TimeOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOnComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
