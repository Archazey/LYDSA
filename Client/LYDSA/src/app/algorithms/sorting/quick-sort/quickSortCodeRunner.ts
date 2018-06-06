import { QuickSortInput } from "../../../shared/models/quick-sort/quick-sort-input";
import { QuickSortRunResult } from "../../../shared/models/quick-sort/quick-sort-run-result";
import { EditorInput } from "../../../shared/models/editor-input";
import { QuickSortOperation } from "../../../shared/models/quick-sort/quick-sort-operation";
import { DsCodeRunner } from '../../../shared/models/ds-code-runner';

// operations
import { Swap } from '../../../shared/models/quick-sort/operations/swap';
import { ColorForPivot } from '../../../shared/models/quick-sort/operations/colorForPivot';
import { DecolorInterval } from '../../../shared/models/quick-sort/operations/decolorInterval';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class QuickSortCodeRunner extends DsCodeRunner {
    data: QuickSortRunResult[];

    runCode(input: QuickSortInput[]): QuickSortRunResult[] {
        this.data = [];

        this.run(input);

        return this.data;
    }

    quickSort(st: number, dr: number, arr: QuickSortInput[]) {
        this.logLine(new QuickSortRunResult(0, QuickSortOperation.None));
        if (st >= dr) {
            this.logLine(new QuickSortRunResult(1, QuickSortOperation.None));
            return;
        }
        this.logLine(new QuickSortRunResult(2, QuickSortOperation.None));
        var pivot = arr[dr];
        this.logLine(new ColorForPivot(-1, QuickSortOperation.ColorForPivot, pivot.item, st, dr))
        this.logLine(new QuickSortRunResult(3, QuickSortOperation.None));
        var i = st - 1;
        this.logLine(new QuickSortRunResult(4, QuickSortOperation.None));
        for (var j = st; j < dr; j++) {
            this.logLine(new QuickSortRunResult(5, QuickSortOperation.None));
            if (arr[j].item <= pivot.item) {
                this.logLine(new QuickSortRunResult(6, QuickSortOperation.None));
                i++;
                this.logLine(new Swap(7, QuickSortOperation.Swap, i, j));
                var aux = arr[i];
                arr[i] = arr[j];
                arr[j] = aux;
                this.logLine(new QuickSortRunResult(8, QuickSortOperation.None));
            }
            this.logLine(new QuickSortRunResult(4, QuickSortOperation.None));
        }
        this.logLine(new Swap(9, QuickSortOperation.Swap, i + 1, dr));
        var aux = arr[i + 1];
        arr[i + 1] = arr[dr];
        arr[dr] = aux;
        this.logLine(new DecolorInterval(-1, QuickSortOperation.DecolorInterval, st, dr));
        this.logLine(new QuickSortRunResult(10, QuickSortOperation.None));
        this.quickSort(st, i, arr);
        this.logLine(new QuickSortRunResult(11, QuickSortOperation.None));
        this.quickSort(i + 2, dr, arr);
    }

    run(input: QuickSortInput[]) {
        this.quickSort(0, input.length - 1, input);
    }

    parseInput(input: string): QuickSortInput[] {
        // split input in words
        var words = input.split(' ');
        var res: QuickSortInput[] = [];
        for (var word of words)
            res.push(new QuickSortInput(parseInt(word)));

        return res;
    }

    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: QuickSortRunResult) {
        this.data.push(line);
    }
}