import { Component, OnInit, Input, SimpleChanges, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-visualization-editor',
  templateUrl: './visualization-editor.component.html',
  styleUrls: ['./visualization-editor.component.css']
})
export class VisualizationEditorComponent implements OnInit, AfterViewInit {
  @Input() disableBreakpoints: boolean;
  @Input() inputCode: string[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanes(changes: SimpleChanges) {
    //TODO: when disableBreakpoints changes, call setDisabled
    for (let propName in changes) {
      let chng = changes[propName];

      console.log(chng);
    }
  }

  setDisabled(disabled: boolean) {
    for (var i = 0; i < this.inputCode.length; i++)
      if (disabled == true)
        $(`#${i}`).attr('disabled', true);
      else
        $(`#${i}`).removeAttr('disabled');
  }

  ngAfterViewInit() {
    this.setDisabled(this.disableBreakpoints);
  }
}