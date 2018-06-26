import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConnectedComponentsOperation } from '../../../shared/models/connected-components/connected-components-operation';
import { ConnectedComponentsRunResult } from '../../../shared/models/connected-components/connected-components-run-result';
import { DsVisualizerComponent } from '../../../shared/models/ds-visualizer';
import { ConnectedComponentsCodeRunner } from '../../../algorithms/graphs/connected-components/connectedComponentsCodeRunner';
import { ConnectedComponentsInput } from '../../../shared/models/connected-components/connected-components-input';
import * as vis from 'vis';

// operations
import { ColorNode } from '../../../shared/models/connected-components/operations/ColorNode';

@Component({
  selector: 'app-connected-components-visualizer',
  templateUrl: './connected-components-visualizer.component.html',
  styleUrls: ['./connected-components-visualizer.component.css']
})
export class ConnectedComponentsVisualizerComponent extends DsVisualizerComponent implements OnInit {
  operationQueue: ConnectedComponentsRunResult[] = [];
  array: ConnectedComponentsInput[];
  indexArray: number[];
  graph: ConnectedComponentsInput;
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
    var runner = new ConnectedComponentsCodeRunner();
    this.graph = runner.parseInput(input)[0];
    console.log(this.graph);
    this.initializeGraph();
  }

  doOperation(operation: ConnectedComponentsRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != ConnectedComponentsOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);

      if (operation.operation == ConnectedComponentsOperation.ColorNode) {
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
        {
          console.log(i + ' ' + this.graph.edges[i][j]);
          if (i < this.graph.edges[i][j])   
          graphEdges.push({ from: i, to: this.graph.edges[i][j] });
          
        }
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

    console.log(data);
    // initialize your network!
    this.network = new vis.Network(container, data, options);
    this.network.setSize();
  }

  clearVisualizer(): void {
  }
}
