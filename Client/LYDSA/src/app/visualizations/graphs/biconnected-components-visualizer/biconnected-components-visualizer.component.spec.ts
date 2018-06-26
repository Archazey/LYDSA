import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiconnectedComponentsVisualizerComponent } from './biconnected-components-visualizer.component';

describe('BiconnectedComponentsVisualizerComponent', () => {
  let component: BiconnectedComponentsVisualizerComponent;
  let fixture: ComponentFixture<BiconnectedComponentsVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiconnectedComponentsVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiconnectedComponentsVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
