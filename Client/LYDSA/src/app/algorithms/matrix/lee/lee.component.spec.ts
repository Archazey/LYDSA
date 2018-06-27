import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeeComponent } from './lee.component';

describe('LeeComponent', () => {
  let component: LeeComponent;
  let fixture: ComponentFixture<LeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
