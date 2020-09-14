import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalRentalsComponent } from './external-rentals.component';

describe('ExternalRentalsComponent', () => {
  let component: ExternalRentalsComponent;
  let fixture: ComponentFixture<ExternalRentalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalRentalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
