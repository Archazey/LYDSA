import { MergeSortRunResult } from '../merge-sort-run-result';
import { MergeSortOperation } from '../merge-sort-operation';

export class DecolorInterval extends MergeSortRunResult {
    st: number;
    dr: number;    

    constructor(_line: number, _operation: MergeSortOperation, _st: number, _dr: number) {
        super(_line, _operation);
        this.st = _st;
        this.dr = _dr;
    }
}