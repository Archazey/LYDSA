import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { DequeOperation } from '../../shared/models/deque/deque-operation';
import { DequeRunResult } from '../../shared/models/deque/deque-run-result';
import { DsVisualizerComponent } from '../../shared/models/ds-visualizer';

@Component({
  selector: 'app-deque-visualizer',
  templateUrl: './deque-visualizer.component.html',
  styleUrls: ['./deque-visualizer.component.css']
})
export class DequeVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  dequeArray: number[] = [];

  constructor() { 
    super();
  }

  ngOnInit() {
    this.scrollToBottom();
  }
 
  doOperation(operation: DequeRunResult): void {
    if (operation.operation == DequeOperation.PushFront)
      this.dequeArray.splice(0, 0, operation.data);

    if (operation.operation == DequeOperation.PushBack)
      this.dequeArray.push(operation.data);

    if (operation.operation == DequeOperation.PopFront)
      this.dequeArray.splice(0, 1);

    if (operation.operation == DequeOperation.PopBack)
      this.dequeArray.splice(this.dequeArray.length - 1, 1);
  }

  clearVisualizer(): void {
    this.dequeArray = [];
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
