import { Component, OnInit, ViewChild } from '@angular/core';

// child components
import { VisualizationEditorComponent } from '../../shared/components/visualization-editor/visualization-editor.component';

// models
import { EditorInput } from '../../shared/models/editor-input';
import { StackInput } from '../../shared/models/stack-input';
import { StackCodeRunner } from './stackCodeRunner';
import { StackRunResult } from '../../shared/models/stack-run-result';
import { StackOperation } from '../../shared/models/stack-operation';
import { StackVisualizerComponent } from '../../visualizations/stack-visualizer/stack-visualizer.component';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  @ViewChild(VisualizationEditorComponent)
  private editorComponent: VisualizationEditorComponent;

  @ViewChild(StackVisualizerComponent)
  private stackVisualizer: StackVisualizerComponent;

  stepText: string;
  inputData: string;
  editorInput: EditorInput[];
  disableBreakpoints: boolean = false;
  runningState: boolean = false;
  stepTime: number = 300;
  highlightedLine: number = -1;
  stepIntervalId: number;

  constructor() {
    this.stepText = 'Logging steps for stack data structure visualization...';
    this.inputData = `Push 3
Push 4
Push 5
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
      this.stepIntervalId = window.setInterval(() => {
        var line: number = this.goToNextBreakpoint(editorData, linesFlow, last);
        last = line;
        if (last == linesFlow.length) {
          this.clearAllComponents();
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
      this.clearAllComponents();
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
    {
      console.log('Send event for line' + linesFlow[i].line);
      this.sendEventToVisualizer(linesFlow[i]);
      if (vis[linesFlow[i].line] == true)
        return i;
    }

    return linesFlow.length;
  }

  clearAllComponents(): void {
    this.stopRunningCode();
    this.clearEditor();
  }

  clearEditor(): void {
    this.highlightedLine = -1;
  }

  stopRunningCode(): void {
    clearInterval(this.stepIntervalId);
  }

  sendEventToVisualizer(codeLine: StackRunResult): void {
     this.stackVisualizer.doOperation(codeLine);
  }
}
