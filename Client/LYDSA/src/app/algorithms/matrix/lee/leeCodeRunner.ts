import { LeeInput } from "../../../shared/models/lee/lee-input";
import { LeeRunResult } from "../../../shared/models/lee/lee-run-result";
import { EditorInput } from "../../../shared/models/editor-input";
import { LeeOperation } from "../../../shared/models/lee/lee-operation";
import { DsCodeRunner } from '../../../shared/models/ds-code-runner';
import * as randomcolor from 'randomcolor';

// operations
import { ColorCell } from '../../../shared/models/lee/operations/colorCell';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class LeeCodeRunner extends DsCodeRunner {
    data: LeeRunResult[];
    queueCell: string = '#66ccff';
    visitCell: string = '#cc6699';
    pathCell: string = '#ffff99';

    runCode(input: LeeInput[]): LeeRunResult[] {
        this.data = [];

        this.run(input);

        return this.data;
    }

    interior(x, y, matrix): boolean {
        this.logLine(new LeeRunResult(0, LeeOperation.None));
        this.logLine(new LeeRunResult(1, LeeOperation.None));
        if (x >= 0 && x < matrix.height && y >= 0 && y < matrix.width) {
            this.logLine(new LeeRunResult(2, LeeOperation.None));
            return true;
        }
        this.logLine(new LeeRunResult(3, LeeOperation.None));
        this.logLine(new LeeRunResult(4, LeeOperation.None));
        return false;
    }

    run(input: LeeInput[]) {
        this.logLine(new LeeRunResult(5, LeeOperation.None));
        this.logLine(new LeeRunResult(6, LeeOperation.None));
        var matrix = input[0];
        this.logLine(new LeeRunResult(7, LeeOperation.None));
        var visited: boolean[][] = new Array(matrix.height), prev: any[][] = new Array(matrix.height);
        this.logLine(new LeeRunResult(8, LeeOperation.None));
        for (var i = 0; i < matrix.height; i++) {
            this.logLine(new LeeRunResult(9, LeeOperation.None));
            visited[i] = new Array(matrix.width);
            this.logLine(new LeeRunResult(10, LeeOperation.None));
            visited[i].fill(false, 0, matrix.width);
            this.logLine(new LeeRunResult(11, LeeOperation.None));
            prev[i] = new Array(matrix.width);
            this.logLine(new LeeRunResult(12, LeeOperation.None));
            this.logLine(new LeeRunResult(8, LeeOperation.None));
        }
        this.logLine(new LeeRunResult(13, LeeOperation.None));
        for (var wall of matrix.walls) {
            this.logLine(new LeeRunResult(14, LeeOperation.None));
            visited[wall.x][wall.y] = true;
            this.logLine(new LeeRunResult(13, LeeOperation.None));
        }
        this.logLine(new LeeRunResult(15, LeeOperation.None));
        var queue: any[] = [];
        this.logLine(new LeeRunResult(16, LeeOperation.None));
        queue.push(matrix.start);
        this.logLine(new ColorCell(-1, LeeOperation.ColorCell, matrix.start, this.queueCell))
        this.logLine(new LeeRunResult(17, LeeOperation.None));
        visited[matrix.start.x][matrix.start.y] = true;
        this.logLine(new LeeRunResult(18, LeeOperation.None));
        var dx = [-1, 0, 1, 0];
        this.logLine(new LeeRunResult(19, LeeOperation.None));
        var dy = [0, 1, 0, -1];
        this.logLine(new LeeRunResult(20, LeeOperation.None));
        while (queue.length > 0 && visited[matrix.stop.x][matrix.stop.y] == false) {
            this.logLine(new LeeRunResult(21, LeeOperation.None));
            var currentCell = queue[0];
            this.logLine(new ColorCell(-1, LeeOperation.ColorCell, currentCell, this.visitCell))
            this.logLine(new LeeRunResult(22, LeeOperation.None));
            queue.shift();
            this.logLine(new LeeRunResult(23, LeeOperation.None));
            for (var i = 0; i < 4; i++) {
                this.logLine(new LeeRunResult(24, LeeOperation.None));
                if (this.interior(currentCell.x + dx[i], currentCell.y + dy[i], matrix) == true && visited[currentCell.x + dx[i]][currentCell.y + dy[i]] == false) {
                    this.logLine(new LeeRunResult(25, LeeOperation.None));
                    visited[currentCell.x + dx[i]][currentCell.y + dy[i]] = true;
                    this.logLine(new LeeRunResult(26, LeeOperation.None));
                    prev[currentCell.x + dx[i]][currentCell.y + dy[i]] = currentCell;
                    this.logLine(new LeeRunResult(27, LeeOperation.None));
                    queue.push({ x: currentCell.x + dx[i], y: currentCell.y + dy[i] });
                    this.logLine(new ColorCell(-1, LeeOperation.ColorCell, { x: currentCell.x + dx[i], y: currentCell.y + dy[i] }, this.queueCell))
                    this.logLine(new LeeRunResult(28, LeeOperation.None));
                }
                this.logLine(new LeeRunResult(23, LeeOperation.None));
            }
        }
        var cell = matrix.stop;
        this.logLine(new ColorCell(-1, LeeOperation.ColorCell, cell, this.pathCell));
        while (cell != matrix.start) {
            cell = prev[cell.x][cell.y];
            this.logLine(new ColorCell(-1, LeeOperation.ColorCell, cell, this.pathCell));
        }
        this.logLine(new ColorCell(-1, LeeOperation.ColorCell, matrix.start, this.pathCell));
    }

    parseInput(input: string): LeeInput[] {
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

        var res: LeeInput = new LeeInput(height, width, start, stop, walls);
        return [res];
    }

    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: LeeRunResult) {
        this.data.push(line);
    }
}