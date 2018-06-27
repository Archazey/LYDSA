import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child components
import { SimulatorComponent } from '../../../shared/components/simulator/simulator.component';

// models
import { LeeCodeRunner } from './leeCodeRunner';

@Component({
  selector: 'app-lee',
  templateUrl: './lee.component.html',
  styleUrls: ['./lee.component.css']
})
export class LeeComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;

  visualizerType: string = 'app-lee-visualizer';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`10 10
1 2 9 9
3 3
3 2
3 1`);

    this.simulatorComponent.addLoggerLine('Logging panel for lee algorithm visualizer...');
    this.simulatorComponent.setCodeRunner(new LeeCodeRunner());
    this.simulatorComponent.setEditorContent();
  }

}
