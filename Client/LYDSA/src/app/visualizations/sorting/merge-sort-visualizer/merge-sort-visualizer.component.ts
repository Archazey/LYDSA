import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MergeSortOperation } from '../../../shared/models/merge-sort/merge-sort-operation';
import { MergeSortRunResult } from '../../../shared/models/merge-sort/merge-sort-run-result';
import { DsVisualizerComponent } from '../../../shared/models/ds-visualizer';
import { MergeSortCodeRunner } from '../../../algorithms/sorting/merge-sort/mergeSortCodeRunner';
import { MergeSortInput } from '../../../shared/models/merge-sort/merge-sort-input';
import * as svgPanZoom from 'svg-pan-zoom';
import * as $ from 'jquery'; 
import * as SVG from 'svg.js';
import * as randomcolor from 'randomcolor';

// operations
import { MoveFromArrToAux } from '../../../shared/models/merge-sort/operations/moveFromArrToAux';
import { MoveFromAuxToArr } from '../../../shared/models/merge-sort/operations/moveFromAuxToArr';
import { ColorInterval } from '../../../shared/models/merge-sort/operations/colorInterval';
import { DecolorInterval } from '../../../shared/models/merge-sort/operations/decolorInterval';

@Component({
  selector: 'app-merge-sort-visualizer',
  templateUrl: './merge-sort-visualizer.component.html',
  styleUrls: ['./merge-sort-visualizer.component.css']
})
export class MergeSortVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewInit {
  operationQueue: MergeSortRunResult[] = [];
  array: MergeSortInput[];
  indexArray: number[];
  auxArray: MergeSortInput[];
  indexAuxArray: number[];
  panZoomSvg: any;

  // for svg
  circleRadius: number = 5;
  gap: number = 5;
  elemWidth: number = 50;
  animationDuration: number = 100;

  constructor() {
    super();
    this.setArray([]);
    setInterval(() => this.runOperation(), this.animationDuration + 10);
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.panZoomSvg = svgPanZoom('#sortContainer', {
      zoomScaleSensitivity: 0.3,
      minZoom: 0.001,
      center: false
    });
  }

  initVisualizer(input: string): void {
    var runner = new MergeSortCodeRunner();
    this.setArray(runner.parseInput(input));
    setTimeout(() => {
      this.centerSvg();
    }, 50);
  }

  doOperation(operation: MergeSortRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != MergeSortOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);
      if (operation.operation == MergeSortOperation.MoveFromArrayToAux) {
        var newOperation = operation as MoveFromArrToAux;
        var x = newOperation.moveFrom, y = newOperation.moveTo;
        this.moveElement(this.indexArray[x], y, 50);
        this.indexAuxArray[y] = this.indexArray[x];
      }

      if (operation.operation == MergeSortOperation.MoveFromAuxToArray) {
        var newOperation = operation as MoveFromAuxToArr;
        var x = newOperation.moveFrom, y = newOperation.moveTo;
        this.moveElement(this.indexAuxArray[x], y, -50);
        this.indexArray[y] = this.indexAuxArray[x];
      }

      if (operation.operation == MergeSortOperation.ColorInterval) {
        var st = (operation as ColorInterval).st, dr = (operation as ColorInterval).dr;
        this.colorInterval(st, dr);
      }

      if (operation.operation == MergeSortOperation.DecolorInterval) {
        var st = (operation as DecolorInterval).st, dr = (operation as DecolorInterval).dr;
        this.decolorInterval(st, dr);
      }
    }
  }

  calculateX(pos: number) {
    return this.circleRadius + this.gap + pos * this.gap + pos * this.elemWidth;
  }

  moveElement(groupIndex: number, pos: number, changeInHeight: number) {
    var group = $(`#G${groupIndex}`);
    var svgText = SVG.select(`#G${groupIndex}`) as any;
    svgText.animate(this.animationDuration, '>').attr({ 
      x: this.calculateX(pos),
      y: parseInt(group.attr('y')) + changeInHeight
    });
  }

  colorInterval(st: number, dr: number) {
    var color = randomcolor();
    for (var i = st; i <= dr; i++) {
      var group = $(`#G${this.indexArray[i]}`);
      group.css('background-color', color);
    }
  }

  decolorInterval(st: number, dr: number) {
    for (var i = st; i <= dr; i++) {
      var group = $(`#G${this.indexArray[i]}`);
      group.css('background-color', '');
    }
  }

  setArray(array: MergeSortInput[]): void {
    this.array = array.slice();
    this.auxArray = array.slice();
    this.indexArray = [];
    this.indexAuxArray = [];
    for (var index in array) {
      this.indexArray.push(parseInt(index));
      this.indexAuxArray.push(parseInt(index));
    }
  }

  centerSvg(): void {
    this.panZoomSvg.updateBBox(); // Update viewport bounding box
    this.panZoomSvg.fit(); // fit works as expected
  }

  clearVisualizer(): void {
    this.setArray([]);
  }
}
