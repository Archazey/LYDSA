import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';

// child components
import { SimulatorComponent } from '../../../shared/components/simulator/simulator.component';

// models
import { MergeSortCodeRunner } from './mergeSortCodeRunner';

@Component({
  selector: 'app-merge-sort',
  templateUrl: './merge-sort.component.html',
  styleUrls: ['./merge-sort.component.css']
})
export class MergeSortComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;

  visualizerType: string = 'app-merge-sort-visualizer';
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`1 10 3 12 2 4`);

    this.simulatorComponent.addLoggerLine('Logging panel for merge sort visualizer...');
    this.simulatorComponent.setCodeRunner(new MergeSortCodeRunner());
    this.simulatorComponent.setEditorContent();
  }
}
