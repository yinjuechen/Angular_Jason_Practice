import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckAdminComponent } from './truck-admin.component';

describe('TruckAdminComponent', () => {
  let component: TruckAdminComponent;
  let fixture: ComponentFixture<TruckAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
