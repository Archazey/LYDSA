import { DsInput } from '../ds-input';

export class QueueInput extends DsInput {
    operation: string;
    data: number;

    constructor(_operation: string, _data?: number) {
        super();
        
        this.operation = _operation;
        this.data = _data || 0;
    }
}