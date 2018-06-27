import { LeeOperation } from './lee-operation';
import { DsRunResult } from '../ds-run-result';

export class LeeRunResult extends DsRunResult {
    operation: LeeOperation;

    constructor(_line: number, _operation: LeeOperation) {
        super(_line);
        this.operation = _operation;
    }
}