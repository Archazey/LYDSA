import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BiconnectedComponentsOperation } from '../../../shared/models/biconnected-components/biconnected-components-operation';
import { BiconnectedComponentsRunResult } from '../../../shared/models/biconnected-components/biconnected-components-run-result';
import { DsVisualizerComponent } from '../../../shared/models/ds-visualizer';
import { BiconnectedComponentsCodeRunner } from '../../../algorithms/graphs/biconnected-components/biconnectedComponentsCodeRunner';
import { BiconnectedComponentsInput } from '../../../shared/models/biconnected-components/biconnected-components-input';
import * as vis from 'vis';

// operations
import { ColorNode } from '../../../shared/models/biconnected-components/operations/colorNode';

@Component({
  selector: 'app-biconnected-components-visualizer',
  templateUrl: './biconnected-components-visualizer.component.html',
  styleUrls: ['./biconnected-components-visualizer.component.css']
})
export class BiconnectedComponentsVisualizerComponent extends DsVisualizerComponent implements OnInit {
  operationQueue: BiconnectedComponentsRunResult[] = [];
  array: BiconnectedComponentsInput[];
  indexArray: number[];
  graph: BiconnectedComponentsInput;
  network: any;
  visNodes: any;

  constructor() {
    super();
    setInterval(() => {
      this.runOperation();
    }, 50);
  }

  ngOnInit() {

  }

  initVisualizer(input: string): void {
    var runner = new BiconnectedComponentsCodeRunner();
    this.graph = runner.parseInput(input)[0];
    this.initializeGraph();
  }

  doOperation(operation: BiconnectedComponentsRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != BiconnectedComponentsOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);
      
      if (operation.operation == BiconnectedComponentsOperation.ColorNode) {
        var newOperation = operation as ColorNode;
        var node = newOperation.index, color = newOperation.color;
        var graphNode = this.visNodes.get(node);
        graphNode.color = {
          border: '#000000',
          background: color,
          highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          }
        }
        this.visNodes.update(graphNode);
      }
    }
  }

  initializeGraph(): void {
    // create an array with nodes
    var graphNodes = [];
    for (var i = 0; i < this.graph.numberOfNodes; i++)
      graphNodes.push({ id: i, label: `Node ${i}` });
    this.visNodes = new vis.DataSet(graphNodes);

    // create an array with edges
    var graphEdges = [];
    for (var i = 0; i < this.graph.numberOfNodes; i++)
      for (var j = 0; j < this.graph.edges[i].length; j++)
          if (i < this.graph.edges[i][j])   
            graphEdges.push({ from: i, to: this.graph.edges[i][j] });
    
    var edges = new vis.DataSet(graphEdges);

    // create a network
    var container = document.getElementById('graphContainer');

    // provide the data in the vis format
    var data = {
      nodes: this.visNodes,
      edges: edges
    };
    var options = {
      nodes: {
        color: {
          background: '#FFFFFF',
          border: '#dee2e6'
        }
      }
    };

    // initialize your network!
    this.network = new vis.Network(container, data, options);
    this.network.setSize();
  }

  clearVisualizer(): void {
  }
}
