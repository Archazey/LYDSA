import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

// child components
import { VisualizationEditorComponent } from '../visualization-editor/visualization-editor.component';
import { BreakpointStepPanelComponent } from '../breakpoint-step-panel/breakpoint-step-panel.component';
import { DsVisualizerComponent } from '../../models/ds-visualizer';

// models
import { EditorInput } from '../../models/editor-input';
import { DsInput } from '../../models/ds-input';
import { DsRunResult } from '../../models/ds-run-result';
import { DsCodeRunner } from '../../models/ds-code-runner';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit, AfterViewInit {
  @Input() visualizerType: string;

  @ViewChild(VisualizationEditorComponent)
  private editorComponent: VisualizationEditorComponent;

  @ViewChild('visualizerComponent')
  private stackVisualizer: DsVisualizerComponent;

  @ViewChild(BreakpointStepPanelComponent)
  private logPanel: BreakpointStepPanelComponent;

  inputData: string;
  editorInput: EditorInput[];
  disableBreakpoints: boolean = false;
  runningState: boolean = false;
  stepTime: number = 300;
  highlightedLine: number = -1;
  stepIntervalId: number; 
  codeRunner: DsCodeRunner;
  chosenLanguage: string;
  codeLanguages: string[];

  constructor() {
    this.codeLanguages = [
      "Typescript",
      "Java"
    ];
    this.chosenLanguage = "Typescript";
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  toggleRunningState(): void {
    if (this.runningState == false) {
      // run the code on new input
      var linesFlow: DsRunResult[] = this.runCode();

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
          this.logPanel.addLine(editorData[linesFlow[line].line].comment);
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

  runCode(): DsRunResult[] {
    var codeInput: DsInput[] = this.codeRunner.parseInput(this.inputData);

    var result = this.codeRunner.runCode(codeInput);

    return result;
  }

  goToNextBreakpoint(editorData: EditorInput[], linesFlow: DsRunResult[], last: number): number {
    var vis: boolean[] = [];
    for (var line of editorData)
      vis.push(line.checked);

    for (var i = last + 1; i < linesFlow.length; i++)
    {
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

  sendEventToVisualizer(codeLine: DsRunResult): void {
     this.stackVisualizer.doOperation(codeLine);
  }

  setInputData(input: string): void {
    this.inputData = input;
  }

  addLoggerLine(line: string): void {
    this.logPanel.addLine(line);
  }

  setCodeRunner(codeRunner: DsCodeRunner): void {
    this.codeRunner = codeRunner;
  }

  setEditorContent(): void {
    this.editorInput = this.codeRunner.getCode(this.chosenLanguage.toLowerCase());
  }

  changeLanguage(index: number) {
    console.log(index);
    this.chosenLanguage = this.codeLanguages[index];
    this.setEditorContent();
  }
}
