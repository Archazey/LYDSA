import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MergeSortOperation } from '../../../shared/models/merge-sort/merge-sort-operation';
import { MergeSortRunResult } from '../../../shared/models/merge-sort/merge-sort-run-result';
import { DsVisualizerComponent } from '../../../shared/models/ds-visualizer';
import { MergeSortCodeRunner } from '../../../algorithms/sorting/merge-sort/mergeSortCodeRunner';
import { MergeSortInput } from '../../../shared/models/merge-sort/merge-sort-input';
import * as svgPanZoom from 'svg-pan-zoom';
import * as $ from 'jquery'; 
import * as SVG from 'svg.js';

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
  animationDuration: number = 50;

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
        var x = operation.moveFromPos, y = operation.moveToPos;
        this.moveElement(this.indexArray[x], y, 50);
        this.indexAuxArray[y] = this.indexArray[x];
      }

      if (operation.operation == MergeSortOperation.MoveFromAuxToArray) {
        var x = operation.moveFromPos, y = operation.moveToPos;
        this.moveElement(this.indexAuxArray[x], y, -50);
        this.indexArray[y] = this.indexAuxArray[x];
      }
    }
  }

  calculateX(pos: number) {
    return this.circleRadius + this.gap + pos * this.gap + pos * this.elemWidth;
  }

  moveElement(groupIndex: number, pos: number, changeInHeight: number) {
    var rect = $(`g#G${groupIndex} > rect`);
    var text = $(`g#G${groupIndex} > text`);
    rect.css('y', parseInt(rect.css('y')) + changeInHeight);  
    rect.css('x', this.calculateX(pos));
    rect.css('transition', `${this.animationDuration}ms`)
    var svgText = SVG.select(`g#G${groupIndex} > text`) as any;
    svgText.animate(this.animationDuration, '>').attr({ 
      x: this.calculateX(pos),
      y: parseInt(text.attr('y')) + changeInHeight
    });
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
