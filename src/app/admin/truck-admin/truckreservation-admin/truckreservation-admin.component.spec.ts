import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckreservationAdminComponent } from './truckreservation-admin.component';

describe('TruckreservationAdminComponent', () => {
  let component: TruckreservationAdminComponent;
  let fixture: ComponentFixture<TruckreservationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckreservationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckreservationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
