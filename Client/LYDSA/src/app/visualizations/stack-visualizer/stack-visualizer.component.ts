import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { StackOperation } from '../../shared/models/stack/stack-operation';
import { StackRunResult } from '../../shared/models/stack/stack-run-result';
import { DsVisualizerComponent } from '../../shared/models/ds-visualizer';
import { StackVisualizerData } from '../../shared/models/stack/stack-visualizer-data';
import * as uniqid from 'uniqid';

@Component({
  selector: 'app-stack-visualizer',
  templateUrl: './stack-visualizer.component.html',
  styleUrls: ['./stack-visualizer.component.css']
})
export class StackVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  stackArray: StackVisualizerData[] = [];

  constructor() { 
    super();
  }

  ngOnInit() {
    this.scrollToBottom();
  }
 
  doOperation(operation: StackRunResult): void {
    if (operation.operation == StackOperation.Push)
      this.pushElement(operation.data);

    if (operation.operation == StackOperation.Pop)
      this.popElement();
  }

  clearVisualizer(): void {
    this.stackArray = [];
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
    this.stackArray.push(new StackVisualizerData('fadeIn', hashValue, data));
    setTimeout(() => {
      var elem = this.stackArray.find((item) => item.hashValue == hashValue);
      if (elem && elem.animation == 'fadeIn')
        elem.animation = '';
    }, 1000);
  }

  popElement() {
    var hashValue = this.stackArray[this.stackArray.length - 1].hashValue;
    this.stackArray[this.stackArray.length - 1].animation = 'fadeOut';
    setTimeout(() => {  
      var pos;
      for (var i in this.stackArray)
        if (this.stackArray[i].hashValue == hashValue)
          pos = i;
      this.stackArray.splice(pos, 1);
    }, 1000);
  }
}
