import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  stepText: string;
  inputMessage: string;
  inputCode: string[];

  constructor() {
    this.stepText = 'Logging steps for stack data structure visualization...';
    this.inputMessage = '// Type your input here...'; 
    this.inputCode = ['if (a == b)', '  cout << "Equality";'];
   }

  ngOnInit() {
  }

}
