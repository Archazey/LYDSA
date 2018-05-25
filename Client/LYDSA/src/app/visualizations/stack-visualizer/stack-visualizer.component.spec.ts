import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackVisualizerComponent } from './stack-visualizer.component';

describe('StackVisualizerComponent', () => {
  let component: StackVisualizerComponent;
  let fixture: ComponentFixture<StackVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
