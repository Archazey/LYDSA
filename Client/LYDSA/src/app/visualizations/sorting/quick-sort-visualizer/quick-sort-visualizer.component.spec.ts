import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSortVisualizerComponent } from './quick-sort-visualizer.component';

describe('QuickSortVisualizerComponent', () => {
  let component: QuickSortVisualizerComponent;
  let fixture: ComponentFixture<QuickSortVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSortVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSortVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
