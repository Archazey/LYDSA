import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointStepPanelComponent } from './breakpoint-step-panel.component';

describe('BreakpointStepPanelComponent', () => {
  let component: BreakpointStepPanelComponent;
  let fixture: ComponentFixture<BreakpointStepPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakpointStepPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointStepPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
