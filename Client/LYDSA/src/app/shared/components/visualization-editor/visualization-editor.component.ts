import { Component, OnInit, Input, SimpleChanges, AfterViewInit, OnChanges, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { EditorInput } from '../../models/editor-input';

@Component({
  selector: 'app-visualization-editor',
  templateUrl: './visualization-editor.component.html',
  styleUrls: ['./visualization-editor.component.css']
})
export class VisualizationEditorComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() disableBreakpoints: boolean;
  @Input() input: EditorInput[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];

      if (propName == "disableBreakpoints")
        this.setDisabled(this.disableBreakpoints);
    }
  }

  setDisabled(disabled: boolean) {
    for (var i = 0; i < this.input.length; i++)
      if (disabled == true)
        $(`#${i}`).attr('disabled', true);
      else
        $(`#${i}`).removeAttr('disabled');
  }

  ngAfterViewInit() {
    this.setDisabled(this.disableBreakpoints);
  }

  getEditorData(): EditorInput[] {
    return this.input;
  }
}