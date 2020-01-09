import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckdetailAdminComponent } from './truckdetail-admin.component';

describe('TruckdetailAdminComponent', () => {
  let component: TruckdetailAdminComponent;
  let fixture: ComponentFixture<TruckdetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckdetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckdetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
