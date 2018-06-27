import { AStarInput } from "../../../shared/models/a-star/a-star-input";
import { AStarRunResult } from "../../../shared/models/a-star/a-star-run-result";
import { EditorInput } from "../../../shared/models/editor-input";
import { AStarOperation } from "../../../shared/models/a-star/a-star-operation";
import { DsCodeRunner } from '../../../shared/models/ds-code-runner';
import * as randomcolor from 'randomcolor';
import * as PriorityQueue from 'js-priority-queue';

// operations
import { ColorCell } from '../../../shared/models/a-star/operations/colorCell';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class AStarCodeRunner extends DsCodeRunner {
    data: AStarRunResult[];
    queueCell: string = '#66ccff';
    visitCell: string = '#cc6699';
    pathCell: string = '#ffff99';

    runCode(input: AStarInput[]): AStarRunResult[] {
        this.data = [];

        this.run(input);

        return this.data;
    }

    interior(x, y, matrix): boolean {
        this.logLine(new AStarRunResult(0, AStarOperation.None));
        this.logLine(new AStarRunResult(1, AStarOperation.None));
        if (x >= 0 && x < matrix.height && y >= 0 && y < matrix.width) {
            this.logLine(new AStarRunResult(2, AStarOperation.None));
            return true;
        }
        this.logLine(new AStarRunResult(3, AStarOperation.None));
        this.logLine(new AStarRunResult(4, AStarOperation.None));
        return false;
    }

    distManhattan(cellA, cellB) {
        this.logLine(new AStarRunResult(5, AStarOperation.None));
        this.logLine(new AStarRunResult(6, AStarOperation.None));
        this.logLine(new AStarRunResult(7, AStarOperation.None));
        return Math.abs(cellA.x - cellB.x) + Math.abs(cellA.y - cellB.y);
    }

    run(input: AStarInput[]) {
        this.logLine(new AStarRunResult(8, AStarOperation.None));
        this.logLine(new AStarRunResult(9, AStarOperation.None));
        var matrix = input[0];
        this.logLine(new AStarRunResult(10, AStarOperation.None));
        var cost: number[][] = new Array(matrix.height), prev: any[][] = new Array(matrix.height);
        this.logLine(new AStarRunResult(11, AStarOperation.None));
        for (var i = 0; i < matrix.height; i++) {
            this.logLine(new AStarRunResult(12, AStarOperation.None));
            cost[i] = new Array(matrix.width);
            this.logLine(new AStarRunResult(13, AStarOperation.None));
            cost[i].fill(matrix.height * matrix.width, 0, matrix.width);
            this.logLine(new AStarRunResult(14, AStarOperation.None));
            prev[i] = new Array(matrix.width);
            this.logLine(new AStarRunResult(15, AStarOperation.None));
            this.logLine(new AStarRunResult(11, AStarOperation.None));
        }
        this.logLine(new AStarRunResult(16, AStarOperation.None));
        for (var wall of matrix.walls) {
            this.logLine(new AStarRunResult(17, AStarOperation.None));
            cost[wall.x][wall.y] = -1;
            this.logLine(new AStarRunResult(16, AStarOperation.None));
        }
        this.logLine(new AStarRunResult(18, AStarOperation.None));
        var queue = new PriorityQueue({
            comparator: function (a, b) {
                return a.cost - b.cost;
            }
        });
        this.logLine(new AStarRunResult(23, AStarOperation.None));
        queue.queue({ x: matrix.start.x, y: matrix.start.y, cost: 0 + this.distManhattan(matrix.start, matrix.stop) });
        this.logLine(new ColorCell(-1, AStarOperation.ColorCell, matrix.start, this.queueCell));
        this.logLine(new AStarRunResult(24, AStarOperation.None));
        cost[matrix.start.x][matrix.start.y] = 0 + this.distManhattan(matrix.start, matrix.stop);
        this.logLine(new AStarRunResult(25, AStarOperation.None));
        var dx = [-1, 0, 1, 0];
        this.logLine(new AStarRunResult(26, AStarOperation.None));
        var dy = [0, 1, 0, -1];
        this.logLine(new AStarRunResult(27, AStarOperation.None));
        while (queue.length > 0) {
            this.logLine(new AStarRunResult(28, AStarOperation.None));
            var currentCell = queue.dequeue();
            this.logLine(new AStarRunResult(29, AStarOperation.None));
            if (currentCell.cost == cost[currentCell.x][currentCell.y]) {
                this.logLine(new AStarRunResult(30, AStarOperation.None));
                this.logLine(new ColorCell(-1, AStarOperation.ColorCell, { x: currentCell.x, y: currentCell.y }, this.visitCell));
                if (currentCell.x == matrix.stop.x && currentCell.y == matrix.stop.y) {
                    this.logLine(new AStarRunResult(31, AStarOperation.None));
                    break;
                }
                this.logLine(new AStarRunResult(32, AStarOperation.None));
                for (var i = 0; i < 4; i++) {
                    this.logLine(new AStarRunResult(33, AStarOperation.None));
                    var newX = currentCell.x + dx[i], newY = currentCell.y + dy[i];
                    this.logLine(new AStarRunResult(34, AStarOperation.None));
                    var newCost = currentCell.cost - this.distManhattan({ x: currentCell.x, y: currentCell.y }, matrix.stop) + 1 + this.distManhattan({ x: newX, y: newY }, matrix.stop);
                    this.logLine(new AStarRunResult(35, AStarOperation.None));
                    if (this.interior(newX, newY, matrix) == true && cost[newX][newY] > newCost) {
                        this.logLine(new AStarRunResult(36, AStarOperation.None));
                        cost[newX][newY] = newCost;
                        this.logLine(new AStarRunResult(37, AStarOperation.None));
                        prev[newX][newY] = { x: currentCell.x, y: currentCell.y };
                        this.logLine(new AStarRunResult(38, AStarOperation.None));
                        queue.queue({ x: newX, y: newY, cost: newCost });
                        this.logLine(new ColorCell(-1, AStarOperation.ColorCell, { x: newX, y: newY }, this.queueCell));
                        this.logLine(new AStarRunResult(39, AStarOperation.None));
                    }
                    this.logLine(new AStarRunResult(40, AStarOperation.None));
                    this.logLine(new AStarRunResult(32, AStarOperation.None));
                }
                this.logLine(new AStarRunResult(41, AStarOperation.None));
            }
            this.logLine(new AStarRunResult(42, AStarOperation.None));
            this.logLine(new AStarRunResult(27, AStarOperation.None));
        }
        var cell = matrix.stop;
        while (cell.x != matrix.start.x || cell.y != matrix.start.y) {
            this.logLine(new ColorCell(-1, AStarOperation.ColorCell, cell, this.pathCell));
            cell = prev[cell.x][cell.y];
        }
        this.logLine(new ColorCell(-1, AStarOperation.ColorCell, matrix.start, this.pathCell));
    }

    parseInput(input: string): AStarInput[] {
        // split input in lines
        var lines = input.split('\n');

        // split input in words
        var words: any[] = [];
        for (var line of lines)
            words.push(line.split(' '));

        // take data
        var height = parseInt(words[0][0]);
        var width = parseInt(words[0][1]);
        var start = { x: parseInt(words[1][0]), y: parseInt(words[1][1]) }, stop = { x: parseInt(words[1][2]), y: parseInt(words[1][3]) };

        var walls: any[] = []
        for (var i = 2; i < words.length; i++)
            walls.push({ x: parseInt(words[i][0]), y: parseInt(words[i][1]) });

        var res: AStarInput = new AStarInput(height, width, start, stop, walls);
        return [res];
    }

    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: AStarRunResult) {
        this.data.push(line);
    }
}