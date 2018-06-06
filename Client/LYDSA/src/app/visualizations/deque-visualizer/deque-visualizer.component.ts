import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { DequeOperation } from '../../shared/models/deque/deque-operation';
import { DequeRunResult } from '../../shared/models/deque/deque-run-result';
import { DsVisualizerComponent } from '../../shared/models/ds-visualizer';
import { DequeVisualizerData } from '../../shared/models/deque/deque-visualizer-data';
import * as uniqid from 'uniqid';

@Component({
  selector: 'app-deque-visualizer',
  templateUrl: './deque-visualizer.component.html',
  styleUrls: ['./deque-visualizer.component.css']
})
export class DequeVisualizerComponent extends DsVisualizerComponent {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  dequeArray: DequeVisualizerData[] = [];
  operationQueue: DequeRunResult[] = [];
  animationDuration: number = 500;

  constructor() {
    super();
    setInterval(() => this.runOperation(), this.animationDuration + 10);
  }

  doOperation(operation: DequeRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != DequeOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);
      
      if (operation.operation == DequeOperation.PushFront)
        this.pushElementToFront(operation.data);

      if (operation.operation == DequeOperation.PushBack)
        this.pushElementToBack(operation.data);

      if (operation.operation == DequeOperation.PopFront)
        this.popElementFromFront();

      if (operation.operation == DequeOperation.PopBack)
        this.popElementFromBack();
    }
  }

  clearVisualizer(): void {
    this.dequeArray = [];
  }

  pushElementToFront(data: number) {
    this.dequeArray.splice(0, 0, new DequeVisualizerData('fadeIn', data));
  }

  pushElementToBack(data: number) {
    this.dequeArray.push(new DequeVisualizerData('fadeIn', data));
  }

  popElementFromFront() {
    this.dequeArray[0].animation = 'fadeOut';
    setTimeout(() => {  
      this.dequeArray.splice(0, 1);
    }, this.animationDuration);
  }

  popElementFromBack() {
    this.dequeArray[this.dequeArray.length - 1].animation = 'fadeOut';
    setTimeout(() => {  
      this.dequeArray.splice(this.dequeArray.length - 1, 1);
    }, this.animationDuration);
  }
}
