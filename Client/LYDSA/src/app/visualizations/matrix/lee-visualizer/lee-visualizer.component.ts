import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import { LeeOperation } from '../../../shared/models/lee/lee-operation';
import { LeeRunResult } from '../../../shared/models/lee/lee-run-result';
import { DsVisualizerComponent } from '../../../shared/models/ds-visualizer';
import { LeeCodeRunner } from '../../../algorithms/matrix/lee/leeCodeRunner';
import { LeeInput } from '../../../shared/models/lee/lee-input';
import * as svgPanZoom from 'svg-pan-zoom';
import * as $ from 'jquery';
import * as SVG from 'svg.js';

// operations
import { ColorCell } from '../../../shared/models/lee/operations/colorCell';

@Component({
  selector: 'app-lee-visualizer',
  templateUrl: './lee-visualizer.component.html',
  styleUrls: ['./lee-visualizer.component.css']
})
export class LeeVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  operationQueue: LeeRunResult[] = [];
  animationDuration: number = 100;
  matrix: LeeInput;
  coloredMatrix: number[][];
  panZoomSvg: any;
  startCell: string = '#33cc33';
  stopCell: string = '#cc0000';
  wallCell: string = '#a3a3c2';

  // for svg
  cellHeight: number = 30;
  cellWidth: number = 30;

  constructor() {
    super();
    setInterval(() => this.runOperation(), this.animationDuration + 10);
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.panZoomSvg = svgPanZoom('#leeContainer', {
      zoomScaleSensitivity: 0.3,
      minZoom: 0.001,
      center: false
    });
  }

  doOperation(operation: LeeRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != LeeOperation.None) {
      this.operationQueue.push(operation);
    }
    console.log(operation);
  }

  initVisualizer(input: string): void {
    var runner = new LeeCodeRunner();
    this.matrix = runner.parseInput(input)[0];
    this.initializeMatrix();
    setTimeout(() => {
      this.centerSvg();
    }, 200);
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);

      if (operation.operation == LeeOperation.ColorCell) {
        var newOperation = operation as ColorCell;
        var cell = newOperation.coordinates, color = newOperation.color;
        var group = $(`#G${cell.x}-${cell.y}`);
        group.css('background-color', color.toString());
      }

    }
  }

  initializeMatrix() {
    this.coloredMatrix = new Array(this.matrix.height);
    for (var i = 0; i < this.matrix.height; i++) {
      this.coloredMatrix[i] = new Array(this.matrix.width);
      this.coloredMatrix[i].fill(0, 0, this.matrix.width);
    }

    this.operationQueue = [];
    setTimeout(() => {
      // clear
      for (var i = 0; i < this.matrix.height; i++)
        for (var j = 0; j < this.matrix.width; j++) {
          var cell = $(`#G${i}-${j}`);
          cell.css('background-color', '');
        }

      var startCell = $(`#G${this.matrix.start.x}-${this.matrix.start.y}`);
      startCell.css('background-color', this.startCell.toString());

      var stopCell = $(`#G${this.matrix.stop.x}-${this.matrix.stop.y}`);
      stopCell.css('background-color', this.stopCell.toString()); 

      for (var wall of this.matrix.walls) {
        var wall = $(`#G${wall.x}-${wall.y}`);
        wall.css('background-color', this.wallCell.toString());
      }
    }, 50);
  }

  centerSvg(): void {
    this.panZoomSvg.updateBBox(); // Update viewport bounding box
    this.panZoomSvg.fit(); // fit works as expected
  }
}
