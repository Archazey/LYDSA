import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { QueueOperation } from '../../shared/models/queue/queue-operation';
import { QueueRunResult } from '../../shared/models/queue/queue-run-result';
import { DsVisualizerComponent } from '../../shared/models/ds-visualizer';

@Component({
  selector: 'app-queue-visualizer',
  templateUrl: './queue-visualizer.component.html',
  styleUrls: ['./queue-visualizer.component.css']
})
export class QueueVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  queueArray: number[] = [];

  constructor() { 
    super();
  }

  ngOnInit() {
    this.scrollToBottom();
  }
 
  doOperation(operation: QueueRunResult): void {
    if (operation.operation == QueueOperation.Push)
      this.queueArray.push(operation.data);

    if (operation.operation == QueueOperation.Pop)
      this.queueArray.splice(0, 1);
  }

  clearVisualizer(): void {
    this.queueArray = [];
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
