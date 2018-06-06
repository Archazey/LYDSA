import { Component, Input, ViewChild } from '@angular/core';
import { QueueOperation } from '../../shared/models/queue/queue-operation';
import { QueueRunResult } from '../../shared/models/queue/queue-run-result';
import { DsVisualizerComponent } from '../../shared/models/ds-visualizer';
import { QueueVisualizerData } from '../../shared/models/queue/queue-visualizer-data';
import * as uniqid from 'uniqid';

@Component({
  selector: 'app-queue-visualizer',
  templateUrl: './queue-visualizer.component.html',
  styleUrls: ['./queue-visualizer.component.css']
})
export class QueueVisualizerComponent extends DsVisualizerComponent {
  queueArray: QueueVisualizerData[] = [];
  operationQueue: QueueRunResult[] = [];
  animationDuration: number = 500;

  constructor() { 
    super();
    setInterval(() => this.runOperation(), this.animationDuration + 10);
  }

  doOperation(operation: QueueRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != QueueOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);
      if (operation.operation == QueueOperation.Push)
        this.pushElement(operation.data);
      if (operation.operation == QueueOperation.Pop)
        this.popElement();
    }
  }

  clearVisualizer(): void {
    this.queueArray = [];
  }

  pushElement(data: number) {
    this.queueArray.splice(0, 0, new QueueVisualizerData('fadeIn', data));
  }

  popElement() {
    this.queueArray[this.queueArray.length - 1].animation = 'fadeOut';
    setTimeout(() => {  
      this.queueArray.splice(this.queueArray.length - 1, 1);
    }, this.animationDuration);
  }
}
