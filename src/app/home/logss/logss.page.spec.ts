import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogssPage } from './logss.page';

describe('LogssPage', () => {
  let component: LogssPage;
  let fixture: ComponentFixture<LogssPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogssPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
