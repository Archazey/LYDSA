import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KruskalVisualizerComponent } from './kruskal-visualizer.component';

describe('KruskalVisualizerComponent', () => {
  let component: KruskalVisualizerComponent;
  let fixture: ComponentFixture<KruskalVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KruskalVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KruskalVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
