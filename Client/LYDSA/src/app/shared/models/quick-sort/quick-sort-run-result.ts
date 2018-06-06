import { QuickSortOperation } from './quick-sort-operation';
import { DsRunResult } from '../ds-run-result';

export class QuickSortRunResult extends DsRunResult {
    operation: QuickSortOperation;
    constructor(_line: number, _operation: QuickSortOperation) {
        super(_line);
        this.operation = _operation;
    }
}