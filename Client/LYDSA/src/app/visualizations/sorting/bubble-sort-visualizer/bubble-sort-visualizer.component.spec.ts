import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleSortVisualizerComponent } from './bubble-sort-visualizer.component';

describe('BubbleSortVisualizerComponent', () => {
  let component: BubbleSortVisualizerComponent;
  let fixture: ComponentFixture<BubbleSortVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleSortVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleSortVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
