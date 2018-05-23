import { Component, OnInit, ViewChild } from '@angular/core';

import { VisualizationEditorComponent } from '../../shared/components/visualization-editor/visualization-editor.component';
import { EditorInput } from '../../shared/models/editor-input';
import { StackInput } from '../../shared/models/stack-input';
import { StackCodeRunner } from './stackCodeRunner';
import { StackRunResult } from '../../shared/models/stack-run-result';
import { StackOperation } from '../../shared/models/stack-operation';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  @ViewChild(VisualizationEditorComponent)
  private editorComponent: VisualizationEditorComponent;

  stepText: string;
  inputData: string;
  editorInput: EditorInput[];
  disableBreakpoints: boolean = false;
  runningState: boolean = false;
  stepTime: number = 1000;
  highlightedLine: number = -1;
  stepIntervalId: NodeJS.Timer;

  constructor() {
    this.stepText = 'Logging steps for stack data structure visualization...';
    this.inputData = `Push 3
Pop`;
    this.editorInput = StackCodeRunner.getCode();
  }

  ngOnInit() {
  }

  toggleRunningState(): void {
    if (this.runningState == false) {
      // run the code on new input
      var linesFlow: StackRunResult[] = this.runCode();

      // take data from editor
      var editorData: EditorInput[] = this.editorComponent.getEditorData();

      var last: number = -1;
      console.log(linesFlow);
      this.stepIntervalId = setInterval(() => {
        var line: number = this.goToNextBreakpoint(editorData, linesFlow, last);
        last = line;
        if (last == linesFlow.length) {
          clearInterval(this.stepIntervalId);
          this.disableBreakpoints = !this.disableBreakpoints;
          this.runningState = !this.runningState;
        }
        else {
          this.stepText = editorData[linesFlow[line].line].comment;
          this.highlightedLine = linesFlow[line].line;
        }
      }, this.stepTime);
    }
    else {
      clearInterval(this.stepIntervalId);
    }

    this.disableBreakpoints = !this.disableBreakpoints;
    this.runningState = !this.runningState;
  }

  runCode(): StackRunResult[] {
    var codeInput: StackInput[] = this.parseInput(this.inputData);

    var result = StackCodeRunner.runCode(codeInput);

    return result;
  }

  parseInput(input: string): StackInput[] {
    // split string into lines
    var lines: string[] = input.split('\n');
    var res: StackInput[] = [];

    for (var line of lines) {
      var words: string[] = line.split(' ');
      var op: string = words[0];
      var num: number = parseInt(words[1]);

      res.push(new StackInput(op, num));
    }

    return res;
  }

  goToNextBreakpoint(editorData: EditorInput[], linesFlow: StackRunResult[], last: number): number {
    var vis: boolean[] = [];
    for (var line of editorData)
      vis.push(line.checked);

    for (var i = last + 1; i < linesFlow.length; i++)
      if (vis[linesFlow[i].line] == true)
        return i;

    return linesFlow.length;
  }
}
