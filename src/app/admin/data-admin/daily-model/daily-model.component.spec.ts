import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyModelComponent } from './daily-model.component';

describe('DailyModelComponent', () => {
  let component: DailyModelComponent;
  let fixture: ComponentFixture<DailyModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
