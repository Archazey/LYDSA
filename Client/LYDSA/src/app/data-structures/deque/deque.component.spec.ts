import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DequeComponent } from './deque.component';

describe('DequeComponent', () => {
  let component: DequeComponent;
  let fixture: ComponentFixture<DequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
