import { BubbleSortOperation } from './bubble-sort-operation';
import { DsRunResult } from '../ds-run-result';

export class BubbleSortRunResult extends DsRunResult {
    operation: BubbleSortOperation;
    posA: number;
    posB: number;

    constructor(_line: number, _operation: BubbleSortOperation, _posA?: number, _posB?: number) {
        super(_line);
        this.operation = _operation;
        this.posA = _posA || 0;
        this.posB = _posB || 0;
    }
}