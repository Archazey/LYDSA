import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AStarVisualizerComponent } from './a-star-visualizer.component';

describe('AStarVisualizerComponent', () => {
  let component: AStarVisualizerComponent;
  let fixture: ComponentFixture<AStarVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AStarVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AStarVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
