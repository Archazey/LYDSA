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

  constructor() { 
    super();
  }

  doOperation(operation: QueueRunResult): void {
    if (operation.operation == QueueOperation.Push)
      this.pushElement(operation.data);

    if (operation.operation == QueueOperation.Pop)
      this.popElement();
  }

  clearVisualizer(): void {
    this.queueArray = [];
  }

  pushElement(data: number) {
    var hashValue = uniqid();
    this.queueArray.push(new QueueVisualizerData('fadeIn', hashValue, data));
    setTimeout(() => {
      var elem = this.queueArray.find((item) => item.hashValue == hashValue);
      if (elem && elem.animation == 'fadeIn')
        elem.animation = '';
    }, 1000);
  }

  popElement() {
    var hashValue = this.queueArray[0].hashValue;
    this.queueArray[0].animation = 'fadeOut';
    setTimeout(() => {  
      var pos;
      for (var i in this.queueArray)
        if (this.queueArray[i].hashValue == hashValue)
          pos = i;
      this.queueArray.splice(pos, 1);
    }, 1000);
  }
}
