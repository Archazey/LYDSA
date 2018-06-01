import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StackOperation } from '../../shared/models/stack/stack-operation';
import { StackRunResult } from '../../shared/models/stack/stack-run-result';
import { DsVisualizerComponent } from '../../shared/models/ds-visualizer';

@Component({
  selector: 'app-stack-visualizer',
  templateUrl: './stack-visualizer.component.html',
  styleUrls: ['./stack-visualizer.component.css']
})
export class StackVisualizerComponent extends DsVisualizerComponent{
  stackArray: number[] = [];

  constructor() { 
    super();
  }

  ngOnInit() {
  }

 
  doOperation(operation: StackRunResult): void {
    if (operation.operation == StackOperation.Push)
      this.stackArray.push(operation.data);

    if (operation.operation == StackOperation.Pop)
      this.stackArray.pop();
  }

  clearVisualizer(): void {
    this.stackArray = [];
  }
}
