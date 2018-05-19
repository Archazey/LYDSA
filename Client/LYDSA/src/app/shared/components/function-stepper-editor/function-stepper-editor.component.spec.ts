import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionStepperEditorComponent } from './function-stepper-editor.component';

describe('FunctionStepperEditorComponent', () => {
  let component: FunctionStepperEditorComponent;
  let fixture: ComponentFixture<FunctionStepperEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionStepperEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionStepperEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
