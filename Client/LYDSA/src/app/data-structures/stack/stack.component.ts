import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit} from '@angular/core';

// child components
import { SimulatorComponent } from '../../shared/components/simulator/simulator.component';

// models
import { EditorInput } from '../../shared/models/editor-input';
import { StackInput } from '../../shared/models/stack/stack-input';
import { StackCodeRunner } from './stackCodeRunner';
import { StackRunResult } from '../../shared/models/stack/stack-run-result';
import { StackOperation } from '../../shared/models/stack/stack-operation';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit, AfterContentInit{
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;

  visualizerType: string = 'app-stack-visualizer';

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`Push 3
Push 4
Push 5
Pop`);

    this.simulatorComponent.addLoggerLine('Logging panel for stack visualizer...');
    this.simulatorComponent.setCodeRunner(new StackCodeRunner());
    this.simulatorComponent.setEditorContent();
    
  }
}
