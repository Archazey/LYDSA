import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeSortVisualizerComponent } from './merge-sort-visualizer.component';

describe('MergeSortVisualizerComponent', () => {
  let component: MergeSortVisualizerComponent;
  let fixture: ComponentFixture<MergeSortVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeSortVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeSortVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
