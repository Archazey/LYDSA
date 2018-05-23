export class StackInput {
    operation: string;
    data?: number;

    constructor(_operation: string, _data?: number) {
        this.operation = _operation;
        this.data = _data || 0;
    }
}