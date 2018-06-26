import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child components
import { SimulatorComponent } from '../../../shared/components/simulator/simulator.component';

// models
import { BiconnectedComponentsCodeRunner } from './biconnectedComponentsCodeRunner';

@Component({
  selector: 'app-biconnected-components',
  templateUrl: './biconnected-components.component.html',
  styleUrls: ['./biconnected-components.component.css']
})
export class BiconnectedComponentsComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;

  visualizerType: string = 'app-biconnected-components-visualizer';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`5 5
0 1
2 3
2 4
1 2
0 4`);

    this.simulatorComponent.addLoggerLine('Logging panel for biconnected components algorithm visualizer...');
    this.simulatorComponent.setCodeRunner(new BiconnectedComponentsCodeRunner());
    this.simulatorComponent.setEditorContent();
  }

}
