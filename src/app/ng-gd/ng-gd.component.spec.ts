import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

import { NgGdComponent } from './ng-gd.component';

describe('NgGdComponent', () => {
  let component: NgGdComponent;
  let fixture: ComponentFixture<NgGdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgGdComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    fixture = TestBed.createComponent(NgGdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
