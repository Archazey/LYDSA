import { QuickSortOperation } from '../quick-sort-operation';
import { QuickSortRunResult } from '../quick-sort-run-result';

export class DecolorInterval extends QuickSortRunResult{  
    st: number;
    dr: number;

    constructor(_line: number, _operation: QuickSortOperation,_st: number, _dr: number) {
        super(_line, _operation);
        this.st = _st;
        this.dr = _dr;
    }
}