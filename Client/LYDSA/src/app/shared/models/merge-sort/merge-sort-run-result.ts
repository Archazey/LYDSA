import { MergeSortOperation } from './merge-sort-operation';
import { DsRunResult } from '../ds-run-result';

export class MergeSortRunResult extends DsRunResult {
    operation: MergeSortOperation;
    moveFromPos: number;
    moveToPos: number;

    constructor(_line: number, _operation: MergeSortOperation, _moveFromPos?: number, _moveToPos?: number) {
        super(_line);
        this.operation = _operation;
        this.moveFromPos = _moveFromPos || 0;
        this.moveToPos = _moveToPos || 0;
    }
}