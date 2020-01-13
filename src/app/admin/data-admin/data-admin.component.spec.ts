import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminComponent } from './data-admin.component';

describe('DataAdminComponent', () => {
  let component: DataAdminComponent;
  let fixture: ComponentFixture<DataAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
