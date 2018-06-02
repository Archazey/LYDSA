import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DequeVisualizerComponent } from './deque-visualizer.component';

describe('DequeVisualizerComponent', () => {
  let component: DequeVisualizerComponent;
  let fixture: ComponentFixture<DequeVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DequeVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DequeVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
