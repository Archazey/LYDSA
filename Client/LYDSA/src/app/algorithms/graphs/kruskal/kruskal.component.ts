import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child components
import { SimulatorComponent } from '../../../shared/components/simulator/simulator.component';

// models
import { KruskalCodeRunner } from './kruskalCodeRunner';

@Component({
  selector: 'app-kruskal',
  templateUrl: './kruskal.component.html',
  styleUrls: ['./kruskal.component.css']
})
export class KruskalComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;

  visualizerType: string = 'app-kruskal-visualizer';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`5 5
0 1 1
2 3 2
2 4 3
1 2 2
0 4 9`);

    this.simulatorComponent.addLoggerLine('Logging panel for kruskal algorithm visualizer...');
    this.simulatorComponent.setCodeRunner(new KruskalCodeRunner());
    this.simulatorComponent.setEditorContent();
  }

}
