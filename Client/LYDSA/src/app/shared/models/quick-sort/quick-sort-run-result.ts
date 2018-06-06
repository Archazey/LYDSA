import { QuickSortOperation } from './quick-sort-operation';
import { DsRunResult } from '../ds-run-result';

export class QuickSortRunResult extends DsRunResult {
    operation: QuickSortOperation;
    posA: number;
    posB: number;

    constructor(_line: number, _operation: QuickSortOperation, _posA?: number, _posB?: number) {
        super(_line);
        this.operation = _operation;
        this.posA = _posA || 0;
        this.posB = _posB || 0;
    }
}