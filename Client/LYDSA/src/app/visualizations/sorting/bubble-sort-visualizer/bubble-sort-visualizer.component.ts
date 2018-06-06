import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BubbleSortOperation } from '../../../shared/models/bubble-sort/bubble-sort-operation';
import { BubbleSortRunResult } from '../../../shared/models/bubble-sort/bubble-sort-run-result';
import { DsVisualizerComponent } from '../../../shared/models/ds-visualizer';
import { BubbleSortCodeRunner } from '../../../algorithms/sorting/bubble-sort/bubbleSortCodeRunner';
import { BubbleSortInput } from '../../../shared/models/bubble-sort/bubble-sort-input';
import * as svgPanZoom from 'svg-pan-zoom';
import * as $ from 'jquery';
import * as SVG from 'svg.js';

@Component({
  selector: 'app-bubble-sort-visualizer',
  templateUrl: './bubble-sort-visualizer.component.html',
  styleUrls: ['./bubble-sort-visualizer.component.css']
})
export class BubbleSortVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewInit {
  operationQueue: BubbleSortRunResult[] = [];
  array: BubbleSortInput[];
  indexArray: number[];
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
    var runner = new BubbleSortCodeRunner();
    this.setArray(runner.parseInput(input));
    setTimeout(() => {
      this.centerSvg();
    }, 50);
  }

  doOperation(operation: BubbleSortRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != BubbleSortOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);
      if (operation.operation == BubbleSortOperation.Swap)
        this.swapElements(operation.posA, operation.posB);
      let aux = this.indexArray[operation.posA];
      this.indexArray[operation.posA] = this.indexArray[operation.posB];
      this.indexArray[operation.posB] = aux;
    }
  }

  swapElements(posA: number, posB: number) {
    var groupIndexA = this.indexArray[posA], groupIndexB = this.indexArray[posB];
    var groupPosA = this.getGroupPos(groupIndexA), groupPosB = this.getGroupPos(groupIndexB);

    this.moveGroup(groupIndexA, groupPosB);
    this.moveGroup(groupIndexB, groupPosA);
  }

  moveGroup(groupIndex: number, newPos: any[]) {
    var group = SVG.select(`g#G${groupIndex} > *`);
    group.each((index) => {
      var groupChild = group.get(index);
      groupChild.animate(this.animationDuration, '>').attr({
        x: newPos[index].x,
        y: newPos[index].y
      });
    });
  }

  getGroupPos(groupIndex: number) {
    var rect = $(`g#G${groupIndex} > rect`), text = $(`g#G${groupIndex} > text`);
    return [{
      x: rect.attr('x'),
      y: rect.attr('y')
    }, {
      x: text.attr('x'),
      y: text.attr('y')
    }];
  }

  setArray(array: BubbleSortInput[]): void {
    this.array = array.slice();
    this.indexArray = [];
    for (var index in array)
      this.indexArray.push(parseInt(index));
  }

  centerSvg(): void {
    this.panZoomSvg.updateBBox(); // Update viewport bounding box
    this.panZoomSvg.fit(); // fit works as expected
  }

  clearVisualizer(): void {
    this.setArray([]);
  }
}