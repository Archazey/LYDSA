import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

// child compoenents
import { SimulatorComponent } from '../../shared/components/simulator/simulator.component';

// models
import { DequeCodeRunner } from './dequeCodeRunner';

@Component({
  selector: 'app-deque',
  templateUrl: './deque.component.html',
  styleUrls: ['./deque.component.css']
})
export class DequeComponent implements OnInit, AfterContentInit {
  @ViewChild(SimulatorComponent)
  private simulatorComponent: SimulatorComponent;
  visualizerType: string = 'app-deque-visualizer';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.simulatorComponent.setInputData(`PushFront 3
PushFront 4
PushBack 5
PopFront
PopFront`);

    this.simulatorComponent.addLoggerLine('Logging panel for deque visualizer...');
    this.simulatorComponent.setCodeRunner(new DequeCodeRunner());
    this.simulatorComponent.setEditorContent();
  }
}
