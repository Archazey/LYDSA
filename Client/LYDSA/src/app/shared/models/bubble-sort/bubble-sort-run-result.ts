import { BubbleSortOperation } from './bubble-sort-operation';
import { DsRunResult } from '../ds-run-result';

export class BubbleSortRunResult extends DsRunResult {
    operation: BubbleSortOperation;

    constructor(_line: number, _operation: BubbleSortOperation) {
        super(_line);
        this.operation = _operation;
    }
}