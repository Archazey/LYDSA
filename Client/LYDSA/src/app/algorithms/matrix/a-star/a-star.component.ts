import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child components
import { SimulatorComponent } from '../../../shared/components/simulator/simulator.component';

// models
import { AStarCodeRunner } from './aStarCodeRunner';

@Component({
  selector: 'app-a-star',
  templateUrl: './a-star.component.html',
  styleUrls: ['./a-star.component.css']
})
export class AStarComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;

  visualizerType: string = 'app-a-star-visualizer';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`10 10
1 2 9 9
3 3
3 2
3 1
3 4
3 6
3 7
3 8`);

    this.simulatorComponent.addLoggerLine('Logging panel for A* algorithm visualizer...');
    this.simulatorComponent.setCodeRunner(new AStarCodeRunner());
    this.simulatorComponent.setEditorContent();
  }

}
