import { ConnectedComponentsInput } from "../../../shared/models/connected-components/connected-components-input";
import { ConnectedComponentsRunResult } from "../../../shared/models/connected-components/connected-components-run-result";
import { EditorInput } from "../../../shared/models/editor-input";
import { ConnectedComponentsOperation } from "../../../shared/models/connected-components/connected-components-operation";
import { DsCodeRunner } from '../../../shared/models/ds-code-runner';
import * as randomcolor from 'randomcolor';

// operations
import { ColorNode } from '../../../shared/models/connected-components/operations/colorNode';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class ConnectedComponentsCodeRunner extends DsCodeRunner {
    data: ConnectedComponentsRunResult[];
    color: string;

    runCode(input: ConnectedComponentsInput[]): ConnectedComponentsRunResult[] {
        this.data = [];

        this.run(input);

        return this.data;
    }

    Dfs(node: number, edges: Object, visited: boolean[]) {
        this.logLine(new ConnectedComponentsRunResult(0, ConnectedComponentsOperation.None));
        this.logLine(new ColorNode(1, ConnectedComponentsOperation.ColorNode, node, this.color));
        visited[node] = true;
        this.logLine(new ConnectedComponentsRunResult(2, ConnectedComponentsOperation.None));
        for (var neighbour of edges[node]) {
            this.logLine(new ConnectedComponentsRunResult(3, ConnectedComponentsOperation.None));
            if (visited[neighbour] == false) {
                this.logLine(new ConnectedComponentsRunResult(4, ConnectedComponentsOperation.None));
                this.Dfs(neighbour, edges, visited);
            }
        }
        this.logLine(new ConnectedComponentsRunResult(5, ConnectedComponentsOperation.None));
    }

    run(input: ConnectedComponentsInput[]) {
        this.logLine(new ConnectedComponentsRunResult(6, ConnectedComponentsOperation.None));
        var graph = input[0];
        this.logLine(new ConnectedComponentsRunResult(7, ConnectedComponentsOperation.None));
        var visited: boolean[] = new Array(graph.numberOfNodes);
        this.logLine(new ConnectedComponentsRunResult(8, ConnectedComponentsOperation.None));
        visited.fill(false, 0, graph.numberOfNodes);
        this.logLine(new ConnectedComponentsRunResult(9, ConnectedComponentsOperation.None));
        for (var i = 0; i < graph.numberOfNodes; i++) {
            this.logLine(new ConnectedComponentsRunResult(10, ConnectedComponentsOperation.None));
            if (visited[i] == false) {
                this.logLine(new ConnectedComponentsRunResult(11, ConnectedComponentsOperation.None));
                this.color = randomcolor();
                this.Dfs(i, graph.edges, visited);
            }
        }
    }

    parseInput(input: string): ConnectedComponentsInput[] {
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
        for (var i = 0; i < numberOfNodes; i++)
            edges[i] = [];
        for (var i = 1; i < words.length; i++) {
            var x = parseInt(words[i][0]), y = parseInt(words[i][1]);
            edges[x].push(y);
            edges[y].push(x);
        }

        var res: ConnectedComponentsInput = new ConnectedComponentsInput(numberOfNodes, numberOfEdges, edges);
        return [res];
    }

    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: ConnectedComponentsRunResult) {
        this.data.push(line);
    }
}