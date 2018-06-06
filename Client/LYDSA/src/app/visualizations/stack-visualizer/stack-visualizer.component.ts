import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { StackOperation } from '../../shared/models/stack/stack-operation';
import { StackRunResult } from '../../shared/models/stack/stack-run-result';
import { DsVisualizerComponent } from '../../shared/models/ds-visualizer';
import { StackVisualizerData } from '../../shared/models/stack/stack-visualizer-data';

@Component({
  selector: 'app-stack-visualizer',
  templateUrl: './stack-visualizer.component.html',
  styleUrls: ['./stack-visualizer.component.css']
})
export class StackVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  stackArray: StackVisualizerData[] = [];
  operationQueue: StackRunResult[] = [];
  animationDuration: number = 500;

  constructor() { 
    super();
    setInterval(() => this.runOperation(), this.animationDuration + 10);
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  doOperation(operation: StackRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != StackOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  clearVisualizer(): void {
    this.stackArray = [];
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);
      if (operation.operation == StackOperation.Push)
        this.pushElement(operation.data);
      if (operation.operation == StackOperation.Pop)
        this.popElement();
    }
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
    this.stackArray.push(new StackVisualizerData('fadeIn', data));
  }

  popElement() {
    this.stackArray[this.stackArray.length - 1].animation = 'fadeOut';
    setTimeout(() => {  
      this.stackArray.splice(this.stackArray.length - 1, 1);
    }, this.animationDuration);
  }
}
