import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child components
import { SimulatorComponent } from '../../../shared/components/simulator/simulator.component';

// models
import { QuickSortCodeRunner } from './quickSortCodeRunner';

@Component({
  selector: 'app-quick-sort',
  templateUrl: './quick-sort.component.html',
  styleUrls: ['./quick-sort.component.css']
})
export class QuickSortComponent implements OnInit, AfterContentInit{
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;
  
  visualizerType: string = 'app-quick-sort-visualizer';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`1 10 3 12 2 4`);

    this.simulatorComponent.addLoggerLine('Logging panel for quick sort visualizer...');
    this.simulatorComponent.setCodeRunner(new QuickSortCodeRunner());
    this.simulatorComponent.setEditorContent();
  }

}
