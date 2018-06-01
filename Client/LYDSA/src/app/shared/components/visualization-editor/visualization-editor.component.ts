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
  @Input() highlightedLine?: number;

  constructor() {
  }

  ngOnInit() {
  } 

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {
  }

  getEditorData(): EditorInput[] {
    return this.input;
  }
}