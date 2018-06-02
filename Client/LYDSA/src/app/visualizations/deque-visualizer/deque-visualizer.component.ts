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
export class DequeVisualizerComponent extends DsVisualizerComponent{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  dequeArray: DequeVisualizerData[] = [];

  constructor() { 
    super();
  }
 
  doOperation(operation: DequeRunResult): void {
    if (operation.operation == DequeOperation.PushFront)
      this.pushElementToFront(operation.data);

    if (operation.operation == DequeOperation.PushBack)
      this.pushElementToBack(operation.data);

    if (operation.operation == DequeOperation.PopFront)
      this.popElementFromFront();

    if (operation.operation == DequeOperation.PopBack)
      this.popElementFromBack();
  }

  clearVisualizer(): void {
    this.dequeArray = [];
  }

  pushElementToFront(data: number) {
    var hashValue = uniqid();
    this.dequeArray.splice(0, 0, new DequeVisualizerData('fadeIn', hashValue, data));
    setTimeout(() => {
      var elem = this.dequeArray.find((item) => item.hashValue == hashValue);
      if (elem && elem.animation == 'fadeIn')
        elem.animation = '';
    }, 1000);
  }

  pushElementToBack(data: number) {
    var hashValue = uniqid();
    this.dequeArray.push(new DequeVisualizerData('fadeIn', hashValue, data));
    setTimeout(() => {
      var elem = this.dequeArray.find((item) => item.hashValue == hashValue);
      if (elem && elem.animation == 'fadeIn')
        elem.animation = '';
    }, 1000);
  }

  popElementFromFront() {
    var hashValue = this.dequeArray[0].hashValue;
    this.dequeArray[0].animation = 'fadeOut';
    setTimeout(() => {  
      var pos;
      for (var i in this.dequeArray)
        if (this.dequeArray[i].hashValue == hashValue)
          pos = i;
      this.dequeArray.splice(pos, 1);
    }, 1000);
  }

  popElementFromBack() {
    var hashValue = this.dequeArray[this.dequeArray.length - 1].hashValue;
    this.dequeArray[this.dequeArray.length - 1].animation = 'fadeOut';
    setTimeout(() => {  
      var pos;
      for (var i in this.dequeArray)
        if (this.dequeArray[i].hashValue == hashValue)
          pos = i;
      this.dequeArray.splice(pos, 1);
    }, 1000);
  }
}
