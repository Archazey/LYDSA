import { DequeOperation } from './deque-operation';
import { DsRunResult } from '../ds-run-result';

export class DequeRunResult extends DsRunResult {
    operation: DequeOperation;
    data: number;

    constructor(_line: number, _operation: DequeOperation, _data?: number) {
        super(_line);
        this.operation = _operation;
        this.data = _data || 0;
    }
}