import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child components
import { SimulatorComponent } from '../../shared/components/simulator/simulator.component';

// models
import { QueueCodeRunner } from './queueCodeRunner';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;

  visualizerType: string = 'app-queue-visualizer';

  constructor() { }

  ngOnInit() {
  }
  
  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`Push 3
Push 4
Push 5
Pop`);

    this.simulatorComponent.addLoggerLine('Logging panel for queue visualizer...');
    this.simulatorComponent.setCodeRunner(new QueueCodeRunner());
    this.simulatorComponent.setEditorContent();
  }
}
