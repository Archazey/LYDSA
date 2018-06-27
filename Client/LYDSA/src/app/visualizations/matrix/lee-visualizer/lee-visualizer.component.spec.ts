import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeeVisualizerComponent } from './lee-visualizer.component';

describe('LeeVisualizerComponent', () => {
  let component: LeeVisualizerComponent;
  let fixture: ComponentFixture<LeeVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeeVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeeVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
