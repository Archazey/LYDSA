import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  stepText: string;

  constructor() {
    this.stepText = 'Logging steps for stack data structure visualization...'
   }

  ngOnInit() {
  }

}
