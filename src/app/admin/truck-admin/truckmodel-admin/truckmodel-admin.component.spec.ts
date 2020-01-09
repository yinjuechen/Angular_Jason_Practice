import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckmodelAdminComponent } from './truckmodel-admin.component';

describe('TruckmodelAdminComponent', () => {
  let component: TruckmodelAdminComponent;
  let fixture: ComponentFixture<TruckmodelAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckmodelAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckmodelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
