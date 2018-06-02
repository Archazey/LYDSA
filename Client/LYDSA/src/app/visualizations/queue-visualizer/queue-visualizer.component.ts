import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
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
export class QueueVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  queueArray: QueueVisualizerData[] = [];

  constructor() { 
    super();
  }

  ngOnInit() {
    this.scrollToBottom();
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

  addAnimationToCard(index: number) {

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  pushElement(data: number) {
    var hashValue = uniqid();
    this.queueArray.push(new QueueVisualizerData('fadeIn', hashValue, data));
    setTimeout(() => {
      var elem = this.queueArray.find((item) => item.hashValue == hashValue);
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
