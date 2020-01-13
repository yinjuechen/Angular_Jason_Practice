import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataIncomeComponent } from './data-income.component';

describe('DataIncomeComponent', () => {
  let component: DataIncomeComponent;
  let fixture: ComponentFixture<DataIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
