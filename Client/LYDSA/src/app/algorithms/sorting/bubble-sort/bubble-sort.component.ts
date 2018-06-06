import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child components
import { SimulatorComponent } from '../../../shared/components/simulator/simulator.component';

// models
import { BubbleSortCodeRunner } from './bubbleSortCodeRunner';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})
export class BubbleSortComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;
  
  visualizerType: string = 'app-bubble-sort-visualizer';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`1 10 3 12 2 4`);

    this.simulatorComponent.addLoggerLine('Logging panel for bubble sort visualizer...');
    this.simulatorComponent.setCodeRunner(new BubbleSortCodeRunner());
    this.simulatorComponent.setEditorContent();
  }

}
