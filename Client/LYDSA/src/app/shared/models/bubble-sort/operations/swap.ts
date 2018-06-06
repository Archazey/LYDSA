import { BubbleSortOperation } from './../bubble-sort-operation';
import { BubbleSortRunResult } from './../bubble-sort-run-result';

export class Swap extends BubbleSortRunResult {
    posA: number;
    posB: number;

    constructor(_line: number, _operation: BubbleSortOperation, _posA: number, _posB: number) {
        super(_line, _operation);
        this.posA = _posA;
        this.posB = _posB;
    }
}