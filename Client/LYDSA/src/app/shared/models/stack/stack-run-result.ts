import { StackOperation } from './stack-operation';
import { DsRunResult } from '../ds-run-result';

export class StackRunResult extends DsRunResult {
    operation: StackOperation;
    data: number;

    constructor(_line: number, _operation: StackOperation, _data?: number) {
        super(_line);
        this.operation = _operation;
        this.data = _data || 0;
    }
}