import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-breakpoint-step-panel',
  templateUrl: './breakpoint-step-panel.component.html',
  styleUrls: ['./breakpoint-step-panel.component.css']
})
export class BreakpointStepPanelComponent implements OnInit, OnChanges {
  @Input() stepText: string;
  steps: string[] = [];

  constructor() {
  }

  ngOnInit() {
    console.log(this.stepText);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];

      if (changes[propName].currentValue)
        this.steps.push(changes[propName].currentValue);
    }
  }

  public clearSteps(): void {
    this.steps = [];
  }

}
