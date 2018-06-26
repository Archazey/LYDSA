import { KruskalInput } from "../../../shared/models/kruskal/kruskal-input";
import { KruskalRunResult } from "../../../shared/models/kruskal/kruskal-run-result";
import { EditorInput } from "../../../shared/models/editor-input";
import { KruskalOperation } from "../../../shared/models/kruskal/kruskal-operation";
import { DsCodeRunner } from '../../../shared/models/ds-code-runner';
import * as randomcolor from 'randomcolor';

// operations
import { ColorNode } from '../../../shared/models/kruskal/operations/colorNode';
import { ColorEdge } from '../../../shared/models/kruskal/operations/colorEdge';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class KruskalCodeRunner extends DsCodeRunner {
    data: KruskalRunResult[];
    nodeColor: string = '#99ccff';
    edgeColor: string = '#ff9933';

    runCode(input: KruskalInput[]): KruskalRunResult[] {
        this.data = [];

        this.run(input);

        return this.data;
    }

    union(nodeA, nodeB, father) {
        this.logLine(new KruskalRunResult(0, KruskalOperation.None));
        this.logLine(new KruskalRunResult(1, KruskalOperation.None));
        father[nodeA] = nodeB;
        this.logLine(new KruskalRunResult(2, KruskalOperation.None));
    }

    findFather(node, father) {
        this.logLine(new KruskalRunResult(3, KruskalOperation.None));
        this.logLine(new KruskalRunResult(4, KruskalOperation.None));
        if (node != father[node]) {
            this.logLine(new KruskalRunResult(5, KruskalOperation.None));
            father[node] = this.findFather(father[node], father);
        }
        this.logLine(new KruskalRunResult(6, KruskalOperation.None));
        this.logLine(new KruskalRunResult(7, KruskalOperation.None));
        return father[node];
    }

    run(input: KruskalInput[]) {
        this.logLine(new KruskalRunResult(8, KruskalOperation.None));
        var graph = input[0];
        this.logLine(new KruskalRunResult(9, KruskalOperation.None));
        var father = new Array(graph.numberOfNodes);
        father.fill(0, 0, graph.numberOfNodes);
        this.logLine(new KruskalRunResult(10, KruskalOperation.None));
        for (var i in father) {
            this.logLine(new KruskalRunResult(11, KruskalOperation.None));
            father[i] = i;
            this.logLine(new KruskalRunResult(10, KruskalOperation.None));
        }
        this.logLine(new KruskalRunResult(12, KruskalOperation.None));
        graph.edges.sort((edgeA, edgeB): number => {
            this.logLine(new KruskalRunResult(13, KruskalOperation.None));
            this.logLine(new KruskalRunResult(14, KruskalOperation.None));
            return edgeA.cost - edgeB.cost;
        });
        this.logLine(new KruskalRunResult(15, KruskalOperation.None));
        for (var edge of graph.edges) {
            this.logLine(new KruskalRunResult(16, KruskalOperation.None));
            var fatherA = this.findFather(edge.nodeA, father);
            this.logLine(new KruskalRunResult(17, KruskalOperation.None));
            var fatherB = this.findFather(edge.nodeB, father);
            this.logLine(new KruskalRunResult(18, KruskalOperation.None));
            if (fatherA != fatherB) {
                this.logLine(new ColorEdge(-1, KruskalOperation.ColorEdge, edge.id, this.edgeColor));
                this.logLine(new ColorNode(-1, KruskalOperation.ColorNode, edge.nodeA, this.nodeColor));
                this.logLine(new ColorNode(-1, KruskalOperation.ColorNode, edge.nodeB, this.nodeColor));
                this.logLine(new KruskalRunResult(19, KruskalOperation.None));
                this.union(fatherA, fatherB, father);
            }
            this.logLine(new KruskalRunResult(20, KruskalOperation.None));
            this.logLine(new KruskalRunResult(15, KruskalOperation.None));
        }
    }

    parseInput(input: string): KruskalInput[] {
        // split input in lines
        var lines = input.split('\n');

        // split input in words
        var words: any[] = [];
        for (var line of lines)
            words.push(line.split(' '));

        // take data
        var numberOfNodes = parseInt(words[0][0]);
        var numberOfEdges = parseInt(words[0][1]);

        var edges: any[] = [];
        for (var i = 1; i < words.length; i++) {
            var x = parseInt(words[i][0]), y = parseInt(words[i][1]), cost = parseInt(words[i][2]);
            edges.push({ nodeA: x, nodeB: y, cost: cost, id: i - 1 });
        }

        var res: KruskalInput = new KruskalInput(numberOfNodes, numberOfEdges, edges);
        return [res];
    }

    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: KruskalRunResult) {
        this.data.push(line);
    }
}