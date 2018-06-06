import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { QuickSortOperation } from '../../../shared/models/quick-sort/quick-sort-operation';
import { QuickSortRunResult } from '../../../shared/models/quick-sort/quick-sort-run-result';
import { DsVisualizerComponent } from '../../../shared/models/ds-visualizer';
import { QuickSortCodeRunner } from '../../../algorithms/sorting/quick-sort/quickSortCodeRunner';
import { QuickSortInput } from '../../../shared/models/quick-sort/quick-sort-input';
import * as svgPanZoom from 'svg-pan-zoom';
import * as $ from 'jquery';
import * as SVG from 'svg.js';
import * as randomcolor from 'randomcolor';

// operations
import { Swap } from '../../../shared/models/quick-sort/operations/swap';
import { ColorForPivot } from '../../../shared/models/quick-sort/operations/colorForPivot';
import { DecolorInterval } from '../../../shared/models/quick-sort/operations/decolorInterval';

@Component({
  selector: 'app-quick-sort-visualizer',
  templateUrl: './quick-sort-visualizer.component.html',
  styleUrls: ['./quick-sort-visualizer.component.css']
})
export class QuickSortVisualizerComponent extends DsVisualizerComponent implements OnInit, AfterViewInit {
  operationQueue: QuickSortRunResult[] = [];
  array: QuickSortInput[];
  indexArray: number[];
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
    var runner = new QuickSortCodeRunner();
    this.setArray(runner.parseInput(input));
    setTimeout(() => {
      this.centerSvg();
    }, 50);
  }

  doOperation(operation: QuickSortRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != QuickSortOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);
      if (operation.operation == QuickSortOperation.Swap) {
        var posA = (operation as Swap).posA, posB = (operation as Swap).posB;
        this.swapElements(posA, posB);
        let aux = this.indexArray[posA];
        this.indexArray[posA] = this.indexArray[posB];
        this.indexArray[posB] = aux;
      }

      if (operation.operation == QuickSortOperation.ColorForPivot) {
        this.colorForPivot(operation as ColorForPivot);
      }

      if (operation.operation == QuickSortOperation.DecolorInterval) {
        this.decolorInterval(operation as DecolorInterval);
      }
    }
  }

  colorForPivot(operation: ColorForPivot) {
    var smallerColor = randomcolor();
    var biggerColor = randomcolor();
    for (var i = operation.st; i <= operation.dr; i++) {
      var group = $(`#G${this.indexArray[i]}`);
      if (this.array[this.indexArray[i]].item <= operation.pivot)
        group.css('background-color', smallerColor);
      else
        group.css('background-color', biggerColor);
    }
  }

  decolorInterval(operation: DecolorInterval) {
    for (var i = operation.st; i <= operation.dr; i++) {
      var group = $(`#G${this.indexArray[i]}`);
      group.css('background-color', '');
    }
  }

  swapElements(posA: number, posB: number) {
    var groupIndexA = this.indexArray[posA], groupIndexB = this.indexArray[posB];
    var groupPosA = this.getGroupPos(groupIndexA), groupPosB = this.getGroupPos(groupIndexB);

    this.moveGroup(groupIndexA, groupPosB);
    this.moveGroup(groupIndexB, groupPosA);
  }

  moveGroup(groupIndex: number, newPos: any) {
    var group = SVG.select(`#G${groupIndex}`) as any;
    group.animate(this.animationDuration, '>').attr({
      x: newPos.x,
      y: newPos.y
    });
  }

  getGroupPos(groupIndex: number) {
    var group = $(`foreignObject#G${groupIndex}`);
    return {
      x: group.attr('x'),
      y: group.attr('y')
    };
  }

  setArray(array: QuickSortInput[]): void {
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
