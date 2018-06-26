import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { KruskalOperation } from '../../../shared/models/kruskal/kruskal-operation';
import { KruskalRunResult } from '../../../shared/models/kruskal/kruskal-run-result';
import { DsVisualizerComponent } from '../../../shared/models/ds-visualizer';
import { KruskalCodeRunner } from '../../../algorithms/graphs/kruskal/kruskalCodeRunner';
import { KruskalInput } from '../../../shared/models/kruskal/kruskal-input';
import * as vis from 'vis';

// operations
import { ColorNode } from '../../../shared/models/kruskal/operations/colorNode';
import { ColorEdge} from '../../../shared/models/kruskal/operations/colorEdge';

@Component({
  selector: 'app-kruskal-visualizer',
  templateUrl: './kruskal-visualizer.component.html',
  styleUrls: ['./kruskal-visualizer.component.css']
})
export class KruskalVisualizerComponent extends DsVisualizerComponent implements OnInit {
  operationQueue: KruskalRunResult[] = [];
  array: KruskalInput[];
  indexArray: number[];
  graph: KruskalInput;
  network: any;
  visNodes: any;
  visEdges: any;

  constructor() {
    super();
    setInterval(() => {
      this.runOperation();
    }, 50);
  }

  ngOnInit() {

  }

  initVisualizer(input: string): void {
    var runner = new KruskalCodeRunner();
    this.graph = runner.parseInput(input)[0];
    this.initializeGraph();
  }

  doOperation(operation: KruskalRunResult): void {
    // put it in a queue because of slow animations
    if (operation.operation != KruskalOperation.None) {
      this.operationQueue.push(operation);
    }
  }

  runOperation(): void {
    if (this.operationQueue.length) {
      var operation = this.operationQueue[0];
      this.operationQueue.splice(0, 1);

      if (operation.operation == KruskalOperation.ColorNode) {
        var newOperation = operation as ColorNode;
        var node = newOperation.index, color = newOperation.color;
        var graphNode = this.visNodes.get(node);
        graphNode.color = {
          border: '#000000',
          background: color
        };
        this.visNodes.update(graphNode);
      }

      if (operation.operation == KruskalOperation.ColorEdge) {
        var newOperation = operation as ColorEdge;
        var edge = newOperation.index, color = newOperation.color;
        var graphEdge = this.visEdges.get(edge);
        console.log(newOperation);
        graphEdge.color = {
          color: color
        };
        graphEdge.width = 3;
        this.visEdges.update(graphEdge);
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
    for (var i = 0; i < this.graph.numberOfEdges; i++)
      graphEdges.push({ from: this.graph.edges[i].nodeA, to: this.graph.edges[i].nodeB, id: i, label: this.graph.edges[i].cost.toString() });

    this.visEdges = new vis.DataSet(graphEdges);

    // create a network
    var container = document.getElementById('graphContainer');

    // provide the data in the vis format
    var data = {
      nodes: this.visNodes,
      edges: this.visEdges
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
