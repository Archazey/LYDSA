import { QuickSortOperation } from '../quick-sort-operation';
import { QuickSortRunResult } from '../quick-sort-run-result';

export class Swap extends QuickSortRunResult{
    posA: number;
    posB: number;

    constructor(_line: number, _operation: QuickSortOperation, _posA: number, _posB: number) {
        super(_line, _operation);
        this.posA = _posA;
        this.posB = _posB;
    }
}