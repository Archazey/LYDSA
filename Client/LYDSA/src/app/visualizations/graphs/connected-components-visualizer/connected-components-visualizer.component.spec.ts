import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedComponentsVisualizerComponent } from './connected-components-visualizer.component';

describe('ConnectedComponentsVisualizerComponent', () => {
  let component: ConnectedComponentsVisualizerComponent;
  let fixture: ComponentFixture<ConnectedComponentsVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedComponentsVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedComponentsVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
