import { MergeSortInput } from "../../../shared/models/merge-sort/merge-sort-input";
import { MergeSortRunResult } from "../../../shared/models/merge-sort/merge-sort-run-result";
import { EditorInput } from "../../../shared/models/editor-input";
import { MergeSortOperation } from "../../../shared/models/merge-sort/merge-sort-operation";
import { DsCodeRunner } from '../../../shared/models/ds-code-runner';

// operations
import { MoveFromArrToAux } from '../../../shared/models/merge-sort/operations/moveFromArrToAux';
import { MoveFromAuxToArr } from '../../../shared/models/merge-sort/operations/moveFromAuxToArr';
import { ColorInterval } from '../../../shared/models/merge-sort/operations/colorInterval';
import { DecolorInterval } from '../../../shared/models/merge-sort/operations/decolorInterval';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class MergeSortCodeRunner extends DsCodeRunner {
    data: MergeSortRunResult[];

    runCode(input: MergeSortInput[]): MergeSortRunResult[] {
        this.data = [];

        this.run(input);

        return this.data;
    }

    mergeSort(st: number, dr: number, arr: MergeSortInput[]) {
        this.logLine(new MergeSortRunResult(0, MergeSortOperation.None));
        this.logLine(new MergeSortRunResult(1, MergeSortOperation.None));
        if (dr - st + 1 <= 1) {
            this.logLine(new MergeSortRunResult(2, MergeSortOperation.None));
            return;
        }

        this.logLine(new MergeSortRunResult(3, MergeSortOperation.None));
        var mij: number = Math.floor((st + dr) / 2);
        this.logLine(new MergeSortRunResult(4, MergeSortOperation.None));
        this.mergeSort(st, mij, arr);
        this.logLine(new MergeSortRunResult(5, MergeSortOperation.None));
        this.mergeSort(mij + 1, dr, arr);

        this.logLine(new ColorInterval(-1, MergeSortOperation.ColorInterval, st, mij));
        this.logLine(new ColorInterval(-1, MergeSortOperation.ColorInterval, mij + 1, dr));

        this.logLine(new MergeSortRunResult(6, MergeSortOperation.None));
        var i = st, j = mij + 1;
        this.logLine(new MergeSortRunResult(7, MergeSortOperation.None));
        var aux: MergeSortInput[] = [];
        this.logLine(new MergeSortRunResult(8, MergeSortOperation.None));
        while (i <= mij && j <= dr) {
            this.logLine(new MergeSortRunResult(9, MergeSortOperation.None));
            if (arr[i].item <= arr[j].item) {
                this.logLine(new MoveFromArrToAux(10, MergeSortOperation.MoveFromArrayToAux, i, st + aux.length));
                aux.push(arr[i]);
                this.logLine(new MergeSortRunResult(11, MergeSortOperation.None));
                i++;
                this.logLine(new MergeSortRunResult(12, MergeSortOperation.None));
            }
            else {
                this.logLine(new MoveFromArrToAux(13, MergeSortOperation.MoveFromArrayToAux, j, st + aux.length));
                aux.push(arr[j]);
                this.logLine(new MergeSortRunResult(14, MergeSortOperation.None));
                j++;
                this.logLine(new MergeSortRunResult(15, MergeSortOperation.None));
                this.logLine(new MergeSortRunResult(16, MergeSortOperation.None));
            }
        }
        this.logLine(new MergeSortRunResult(17, MergeSortOperation.None));
        while (i <= mij) {
            this.logLine(new MoveFromArrToAux(18, MergeSortOperation.MoveFromArrayToAux, i, st + aux.length));
            aux.push(arr[i]);
            this.logLine(new MergeSortRunResult(19, MergeSortOperation.None));
            i++;
            this.logLine(new MergeSortRunResult(20, MergeSortOperation.None));
        }
        this.logLine(new MergeSortRunResult(21, MergeSortOperation.None));
        while (j <= dr) {
            this.logLine(new MoveFromArrToAux(22, MergeSortOperation.MoveFromArrayToAux, j, st + aux.length));
            aux.push(arr[j]);
            this.logLine(new MergeSortRunResult(23, MergeSortOperation.None));
            j++;
            this.logLine(new MergeSortRunResult(24, MergeSortOperation.None));
        }
        this.logLine(new MergeSortRunResult(25, MergeSortOperation.None));
        for (var index in aux) {
            this.logLine(new MoveFromAuxToArr(26, MergeSortOperation.MoveFromAuxToArray, st + parseInt(index), st + parseInt(index)));
            arr[st + parseInt(index)] = aux[index];
        }

        this.logLine(new DecolorInterval(-1, MergeSortOperation.DecolorInterval, st, dr));
    }

    run(input: MergeSortInput[]) {
        this.mergeSort(0, input.length - 1, input);
    }

    parseInput(input: string): MergeSortInput[] {
        // split input in words
        var words = input.split(' ');
        var res: MergeSortInput[] = [];
        for (var word of     words) 
            res.push(new MergeSortInput(parseInt(word)));
        
        return res;
    }

    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: MergeSortRunResult) {
        this.data.push(line);
    }
}