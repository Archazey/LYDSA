import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child components
import { SimulatorComponent } from '../../../shared/components/simulator/simulator.component';

// models
import { ConnectedComponentsCodeRunner } from './connectedComponentsCodeRunner';

@Component({
  selector: 'app-connected-components',
  templateUrl: './connected-components.component.html',
  styleUrls: ['./connected-components.component.css']
})
export class ConnectedComponentsComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;

  visualizerType: string = 'app-connected-components-visualizer';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`5 3
0 1
2 3
2 4`);

    this.simulatorComponent.addLoggerLine('Logging panel for connected components visualizer...');
    this.simulatorComponent.setCodeRunner(new ConnectedComponentsCodeRunner());
    this.simulatorComponent.setEditorContent();
  }

}
