import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { EditorInput } from '../../models/editor-input';

@Component({
  selector: 'app-visualization-editor',
  templateUrl: './visualization-editor.component.html',
  styleUrls: ['./visualization-editor.component.css']
})
export class VisualizationEditorComponent implements OnInit{
  @Input() disableBreakpoints: boolean;
  @Input() input: EditorInput[];
  @Input() highlightedLine?: number;

  constructor() {
  }

  ngOnInit() {
  } 

  getEditorData(): EditorInput[] {
    return this.input;
  }
}