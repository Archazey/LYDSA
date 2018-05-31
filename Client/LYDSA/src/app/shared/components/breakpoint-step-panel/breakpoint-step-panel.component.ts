import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-breakpoint-step-panel',
  templateUrl: './breakpoint-step-panel.component.html',
  styleUrls: ['./breakpoint-step-panel.component.css']
})
export class BreakpointStepPanelComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  steps: string[] = [];

  constructor() {
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];

      if (changes[propName].currentValue)
        this.steps.push(changes[propName].currentValue);
    }
  }

  public clearSteps(): void {
    this.steps = this.steps.slice(0, 1); // trim all except first line of info
  }

  public addLine(line: string): void {
    this.steps.push(line);
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
