import { MergeSortOperation } from './merge-sort-operation';
import { DsRunResult } from '../ds-run-result';

export class MergeSortRunResult extends DsRunResult {
    operation: MergeSortOperation;

    constructor(_line: number, _operation: MergeSortOperation) {
        super(_line);
        this.operation = _operation;
    }
}