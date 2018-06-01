import { QueueOperation } from './queue-operation';
import { DsRunResult } from '../ds-run-result';

export class QueueRunResult extends DsRunResult {
    operation: QueueOperation;
    data: number;

    constructor(_line: number, _operation: QueueOperation, _data?: number) {
        super(_line);
        this.operation = _operation;
        this.data = _data || 0;
    }
}