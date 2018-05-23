import { Component, OnInit, ViewChild } from '@angular/core';

import { VisualizationEditorComponent } from '../../shared/components/visualization-editor/visualization-editor.component';
import { EditorInput } from '../../shared/models/editor-input';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  @ViewChild(VisualizationEditorComponent)
  private editorComponent: VisualizationEditorComponent;
  
  stepText: string;
  inputMessage: string;
  editorInput: EditorInput[];
  disableBreakpoints: boolean = false;
  runningState: boolean = false;

  constructor() {
    this.stepText = 'Logging steps for stack data structure visualization...';
    this.inputMessage = '// Type your input here...'; 
    this.editorInput = [ new EditorInput(false, 'if (a == b)', 'bla'), new EditorInput(true, '  cout << "Equality";', '')];
   }

  ngOnInit() {
  }

  toggleRunningState(): void {
    if (this.runningState == false) { // run the code
      // take data from editor
      var editorData: EditorInput[] = this.editorComponent.getEditorData();
      console.log(editorData);
    }

    this.disableBreakpoints = !this.disableBreakpoints;
    this.runningState = !this.runningState;
  }
}
