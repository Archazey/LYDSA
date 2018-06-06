import { QuickSortOperation } from '../quick-sort-operation';
import { QuickSortRunResult } from '../quick-sort-run-result';

export class ColorForPivot extends QuickSortRunResult{  
    pivot: number;
    st: number;
    dr: number;

    constructor(_line: number, _operation: QuickSortOperation, _pivot: number, _st: number, _dr: number) {
        super(_line, _operation);
        this.pivot = _pivot;
        this.st = _st;
        this.dr = _dr;
    }
}