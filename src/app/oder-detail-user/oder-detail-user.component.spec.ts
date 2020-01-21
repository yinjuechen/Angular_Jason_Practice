import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OderDetailUserComponent } from './oder-detail-user.component';

describe('OderDetailUserComponent', () => {
  let component: OderDetailUserComponent;
  let fixture: ComponentFixture<OderDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OderDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OderDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
