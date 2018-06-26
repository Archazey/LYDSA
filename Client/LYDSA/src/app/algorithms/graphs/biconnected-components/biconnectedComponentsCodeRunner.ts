import { BiconnectedComponentsInput } from "../../../shared/models/biconnected-components/biconnected-components-input";
import { BiconnectedComponentsRunResult } from "../../../shared/models/biconnected-components/biconnected-components-run-result";
import { EditorInput } from "../../../shared/models/editor-input";
import { BiconnectedComponentsOperation } from "../../../shared/models/biconnected-components/biconnected-components-operation";
import { DsCodeRunner } from '../../../shared/models/ds-code-runner';
import * as randomcolor from 'randomcolor';

// operations
import { ColorNode } from '../../../shared/models/biconnected-components/operations/colorNode';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class BiconnectedComponentsCodeRunner extends DsCodeRunner {
    data: BiconnectedComponentsRunResult[];

    runCode(input: BiconnectedComponentsInput[]): BiconnectedComponentsRunResult[] {
        this.data = [];

        this.run(input);

        return this.data;
    }

    dfs(node, edges, visited, level, minlevel, stack) {
        this.logLine(new BiconnectedComponentsRunResult(0, BiconnectedComponentsOperation.None));
        this.logLine(new BiconnectedComponentsRunResult(1, BiconnectedComponentsOperation.None));
        visited[node] = true;
        this.logLine(new BiconnectedComponentsRunResult(2, BiconnectedComponentsOperation.None));
        minlevel[node] = level[node];
        this.logLine(new BiconnectedComponentsRunResult(3, BiconnectedComponentsOperation.None));
        for (var neighbour of edges[node]) {
            this.logLine(new BiconnectedComponentsRunResult(4, BiconnectedComponentsOperation.None));
            if (visited[neighbour] == false) {
                this.logLine(new BiconnectedComponentsRunResult(5, BiconnectedComponentsOperation.None));
                level[neighbour] = level[node] + 1;
                this.logLine(new BiconnectedComponentsRunResult(6, BiconnectedComponentsOperation.None));
                stack.push(neighbour);
                this.logLine(new BiconnectedComponentsRunResult(7, BiconnectedComponentsOperation.None));
                this.dfs(neighbour, edges, visited, level, minlevel, stack);
                this.logLine(new BiconnectedComponentsRunResult(8, BiconnectedComponentsOperation.None));
                minlevel[node] = Math.min(minlevel[node], minlevel[neighbour]);
                this.logLine(new BiconnectedComponentsRunResult(9, BiconnectedComponentsOperation.None));
                if (minlevel[neighbour] >= level[node]) {
                    this.logLine(new BiconnectedComponentsRunResult(10, BiconnectedComponentsOperation.None));
                    var color = randomcolor();
                    while (stack[stack.length - 1] != neighbour) {
                        this.logLine(new BiconnectedComponentsRunResult(11, BiconnectedComponentsOperation.None));
                        this.logLine(new ColorNode(-1, BiconnectedComponentsOperation.ColorNode, stack[stack.length - 1], color));
                        stack.splice(stack.length - 1, 1);
                        this.logLine(new BiconnectedComponentsRunResult(10, BiconnectedComponentsOperation.None));
                    }
                    this.logLine(new BiconnectedComponentsRunResult(12, BiconnectedComponentsOperation.None));
                    this.logLine(new ColorNode(-1, BiconnectedComponentsOperation.ColorNode, stack[stack.length - 1], color));
                    stack.splice(stack.length - 1, 1);
                    this.logLine(new ColorNode(-1, BiconnectedComponentsOperation.ColorNode, node, color));
                    this.logLine(new BiconnectedComponentsRunResult(13, BiconnectedComponentsOperation.None));
                }
                this.logLine(new BiconnectedComponentsRunResult(14, BiconnectedComponentsOperation.None));
            }
            this.logLine(new BiconnectedComponentsRunResult(15, BiconnectedComponentsOperation.None));
            minlevel[node] = Math.min(minlevel[node], level[neighbour]);
            this.logLine(new BiconnectedComponentsRunResult(16, BiconnectedComponentsOperation.None));
            this.logLine(new BiconnectedComponentsRunResult(3, BiconnectedComponentsOperation.None));
        }
        this.logLine(new BiconnectedComponentsRunResult(17, BiconnectedComponentsOperation.None));
    }

    run(input: BiconnectedComponentsInput[]) {
        this.logLine(new BiconnectedComponentsRunResult(18, BiconnectedComponentsOperation.None));
        this.logLine(new BiconnectedComponentsRunResult(19, BiconnectedComponentsOperation.None));
        var graph = input[0];
        this.logLine(new BiconnectedComponentsRunResult(20, BiconnectedComponentsOperation.None));
        var visited: boolean[] = new Array(graph.numberOfNodes);
        this.logLine(new BiconnectedComponentsRunResult(21, BiconnectedComponentsOperation.None));
        var level: number[] = new Array(graph.numberOfNodes), minlevel = new Array(graph.numberOfNodes);
        this.logLine(new BiconnectedComponentsRunResult(22, BiconnectedComponentsOperation.None));
        var stack: number[] = [];
        this.logLine(new BiconnectedComponentsRunResult(23, BiconnectedComponentsOperation.None));
        visited.fill(false, 0, graph.numberOfNodes);
        this.logLine(new BiconnectedComponentsRunResult(24, BiconnectedComponentsOperation.None));
        level.fill(1, 0, graph.numberOfNodes);
        this.logLine(new BiconnectedComponentsRunResult(25, BiconnectedComponentsOperation.None));
        minlevel.fill(0, 0, graph.numberOfNodes);
        this.logLine(new BiconnectedComponentsRunResult(26, BiconnectedComponentsOperation.None));
        for (var i = 0; i < graph.numberOfNodes; i++) {
            this.logLine(new BiconnectedComponentsRunResult(27, BiconnectedComponentsOperation.None));
            if (visited[i] == false) {
                this.logLine(new BiconnectedComponentsRunResult(28, BiconnectedComponentsOperation.None));
                this.dfs(i, graph.edges, visited, level, minlevel, stack);
            }
            this.logLine(new BiconnectedComponentsRunResult(29, BiconnectedComponentsOperation.None));
            this.logLine(new BiconnectedComponentsRunResult(26, BiconnectedComponentsOperation.None));
        }
    }

    parseInput(input: string): BiconnectedComponentsInput[] {
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

        var res: BiconnectedComponentsInput = new BiconnectedComponentsInput(numberOfNodes, numberOfEdges, edges);
        return [res];
    }

    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: BiconnectedComponentsRunResult) {
        this.data.push(line);
    }
}